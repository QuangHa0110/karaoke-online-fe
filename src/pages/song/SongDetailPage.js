/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-unused-vars */
import { HeartFilled, HeartOutlined, LikeOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Button, Card, Col, List, notification, Row } from 'antd'
import SongItem from 'components/SongItem/SongItem'
import React, { useEffect, useState } from 'react'
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
import { Helmet } from 'react-helmet'

const mapStateToProps = ({ user, dispatch, song, favoriteSong }) => ({
  dispatch,
  user,
  authorized: user.authorized,
  song,
  favoriteSong,
})

const SongDetailPage = (props) => {
  // get id from path url
  const { id } = useParams()
  const { authorized, dispatch, song, user, favoriteSong } = props
  useEffect(() => {
    dispatch({
      type: 'song/GET_SONG_BY_ID',
      payload: {
        id,
      },
    })
    if (user.authorized) {
      dispatch({
        type: 'song-history/CREATE_SONG_HISTORY',
        payload: {
          data: {
            song: id,
            user: user.id,
          },
        },
      })
      dispatch({
        type: 'favorite-song/CHECK_FAVORITE_SONG',
        payload: {
          song: id,
          user: user.id,
        },
      })
    }
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
      } else {
        dispatch({
          type: 'song/SET_STATE',
          payload: {
            sameSingerSongs: [],
          },
        })
      }
    }
  }, [song.currentSong])
  const [isFavoriteSong, setIsFavoriteSong] = useState(favoriteSong.isFavoriteSong)
  useEffect(() => {
    setIsFavoriteSong(favoriteSong.isFavoriteSong)
  }, [favoriteSong.isFavoriteSong])
  const handleAddYourFavoriteSong = () => {
    if (authorized) {
      setIsFavoriteSong(true)
      dispatch({
        type: 'favorite-song/ADD_FAVORITE_SONG',
        payload: {
          data: {
            song: id,
            user: user.id,
          },
        },
      })
    } else {
      history.push('/auth/login', { previousPath: props.location.pathname })
    }
  }
  const handleRemoveYourFavoriteSong = () => {
    if (authorized) {
      setIsFavoriteSong(false)
      dispatch({
        type: 'favorite-song/REMOVE_FAVORITE_SONG',
        payload: {
          song: id,
          user: user.id,
        },
      })
    }
  }

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Helmet title={song.currentSong ? song.currentSong.attributes.name : ''} />
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
              // playing
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
                type="dashed"
                danger
                size="large"
                shape="round"
                hidden={isFavoriteSong}
                icon={<HeartOutlined />}
                onClick={handleAddYourFavoriteSong}
              >
                Thêm vào danh sách bài hát yêu thích
              </Button>
              <Button
                type="ghost"
                danger
                size="large"
                shape="round"
                hidden={!isFavoriteSong}
                icon={<HeartFilled />}
                onClick={handleRemoveYourFavoriteSong}
              >
                Đã thêm danh sách bài hát yêu thích
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
