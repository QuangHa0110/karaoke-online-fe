/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-unused-vars */
import { LikeOutlined } from '@ant-design/icons'
import { Button, Card, Col, List, notification, Row } from 'antd'
import SongItem from 'components/SongItem/SongItem'
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { useParams, withRouter } from 'react-router-dom'
import { history } from 'index'
import userReducer from 'redux/user/reducers'
import actions from 'redux/user/actions'
import { CHANGE_SETTING } from 'redux/settings/sagas'
import SongList from 'components/SongList/SongList'
import formatUrlImage from 'services/ultis/helper/FormatHepler'
import { MUSIC_GENRE_LABEL } from 'services/ultis/constants'

const mapStateToProps = ({ user, dispatch, song }) => ({
  dispatch,
  user,
  authorized: user.authorized,
  song,
})

const SongDetailPage = (props) => {
  // get id from path url
  const { id } = useParams()
  const { authorized, dispatch, song } = props
  useEffect(() => {
    dispatch({
      type: 'song/GET_SONG_BY_ID',
      payload: {
        id,
      },
    })
  }, [])

  useEffect(() => {
    if (song && song.currentSong && song.currentSong.attributes) {
      dispatch({
        type: 'song/GET_SAME_GENRE_SONGS',
        payload: {
          id,
          genre: song.currentSong.attributes.genre,
        },
      })
      if (song.currentSong.attributes.singer.data) {
        dispatch({
          type: 'song/GET_SAME_SINGER_SONGS',
          payload: {
            id,
            singerId: song.currentSong.attributes.singer.data.id,
          },
        })
      }
    }
  }, [song.currentSong])
  const handleAddYourFavoriteSong = () => {
    if (authorized) {
      notification.success({
        message: 'Thêm bài hát thành công',
      })
    } else {
      history.push('/auth/login', { previousPath: props.location.pathname })
    }
  }
  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Card>
        <Row>
          <h3 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            {song.currentSong ? song.currentSong.attributes.name : ''}{' '}
            {song.currentSong && song.currentSong.attributes.singer.data
              ? `- ${song.currentSong.attributes.singer.data.attributes.name}`
              : ''}
          </h3>
        </Row>
        <br />
        <Row gutter={[30, 30]}>
          <Col span={16} style={{ cursor: 'pointer' }}>
            <ReactPlayer
              width="100%"
              height={500}
              url={
                song.currentSong
                  ? formatUrlImage(song.currentSong.attributes.media.data.attributes.url)
                  : ''
              }
              controls
            />
          </Col>
          <Col span={8}>
            <h5>
              <b>Thể loại:</b>{' '}
              {song.currentSong ? MUSIC_GENRE_LABEL[song.currentSong.attributes.genre] : ''}
            </h5>
            <h5>
              {song.currentSong && song.currentSong.attributes.singer.data ? (
                <>
                  <b>Ca sĩ:</b> {song.currentSong.attributes.singer.data.attributes.name}
                </>
              ) : null}
            </h5>
            <div style={{ width: '100%', textAlign: 'center', marginTop: '50px' }}>
              <Button
                type="primary"
                size="large"
                shape="round"
                icon={<LikeOutlined />}
                onClick={handleAddYourFavoriteSong}
              >
                Thêm vào danh sách bài hát yêu thích
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
      <br />
      <Card title={<h3 style={{ fontWeight: 'bold' }}>BÀI HÁT CÙNG THỂ LOẠI</h3>}>
        <SongList data={song.sameGenreSongs} />
      </Card>
      <br />
      <Card title={<h3 style={{ fontWeight: 'bold' }}>BÀI HÁT CÙNG CA SĨ</h3>}>
        <SongList data={song.sameSingerSongs} />
      </Card>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(SongDetailPage))
