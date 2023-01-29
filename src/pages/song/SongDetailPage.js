/* eslint-disable react/no-string-refs */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-unused-vars */
import {
  HeartFilled,
  HeartOutlined,
  LikeOutlined,
  PlayCircleOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Form, Input, List, Modal, notification, Row } from 'antd'
import SongItem from 'components/SongItem/SongItem'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { useParams, withRouter } from 'react-router-dom'
import { history } from 'index'
import SongList from 'components/SongList/SongList'
import formatUrlImage from 'services/ultis/helper/FormatHepler'
import { MUSIC_GENRE_LABEL } from 'services/ultis/constants'
import { Helmet } from 'react-helmet'
import { useReactMediaRecorder } from 'react-media-recorder'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import FormItem from 'antd/es/form/FormItem'
import moment from 'moment'
import UploadFileAPI from 'services/api/upload-file.api'
import apiClient from 'services/axios'
import styles from './style.module.scss'

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
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      screen: true,
      video: true,
    })
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
      if (song.currentSong.attributes.singers.data) {
        dispatch({
          type: 'song/GET_SAME_SINGER_SONGS',
          payload: {
            id,
            singerIds: song.currentSong.attributes.singers.data?.map((e) => e.id),
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
  const [isPlaying, setIsPlaying] = useState(true)
  const player = useRef()
  const onClickFullscreen = () => {
    screenfull.request(findDOMNode(player.current))
  }

  useEffect(() => {
    if (status === 'recording') {
      onClickFullscreen()
      player.current.seekTo(0, 'seconds')
      setIsPlaying(true)
      setIsRecording(true)
    }

    if (status === 'stopped') {
      screenfull.exit()
      setIsPlaying(false)
      setIsRecording(false)
      setIsModalOpen(true)
    }
  }, [status])

  const [isRecording, setIsRecording] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  function getDefaultNameRecording() {
    return `${
      song.currentSong ? song.currentSong.attributes.name : ''
    }_${moment().unix()}`.replaceAll(' ', '_')
  }

  async function uploadVideo(url) {
    const videoBlob = await fetch(url).then((r) => r.blob())
    const file = new File(
      [videoBlob],
      `${
        song.currentSong ? song.currentSong.attributes.name : ''
      }_${moment().unix()}.mp4`.replaceAll(' ', '_'),
      { type: 'video/mp4' },
    )

    const formData = new FormData()
    formData.append('files', file)
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (response) {
      const videoId = response.data[0].id
      const userId = user.id
      const songId = song.currentSong.id
      const payload = {
        data: {
          video: videoId,
          user: userId,
          song: songId,
          name: form.getFieldValue('name') ? form.getFieldValue('name') : getDefaultNameRecording(),
        },
      }
      dispatch({
        type: 'my-song/CREATE_MY_SONG',
        payload,
      })
    }

    return response
  }
  const handleOk = () => {
    uploadVideo(mediaBlobUrl).then((response) => {
      if (response) {
        setIsModalOpen(false)
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [form] = Form.useForm()
  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Helmet title={song.currentSong ? song.currentSong.attributes.name : ''} />
      <Modal
        title="Lưu ghi âm"
        width="50%"
        destroyOnClose
        open={isModalOpen}
        onOk={handleOk}
        okText="Lưu"
        onCancel={handleCancel}
      >
        <Form form={form} name="recording_form">
          <FormItem name="name" label="Tên ghi âm" required>
            <Input
              defaultValue={`${
                song.currentSong ? song.currentSong.attributes.name : ''
              }_${moment().unix()}`.replaceAll(' ', '_')}
            />
          </FormItem>
        </Form>
        <ReactPlayer width="100%" url={mediaBlobUrl} controls />
      </Modal>
      <Card>
        <Row>
          <h3 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            {song.currentSong ? song.currentSong.attributes.name : ''}{' '}
            {song.currentSong && song.currentSong.attributes.singers.data
              ? `- ${Array.from(
                  song.currentSong.attributes.singers.data?.map((e) => e.attributes.name),
                ).join()}`
              : ''}
            {/* {song.currentSong && song.currentSong.attributes.singer.data
              ? `- ${song.currentSong.attributes.singer.data.attributes.name}`
              : ''} */}
          </h3>
        </Row>
        <br />
        <Row gutter={[30, 30]}>
          <Col span={16} style={{ cursor: 'pointer' }}>
            <ReactPlayer
              ref={player}
              width="100%"
              height={500}
              playing={isPlaying}
              pip
              url={
                song.currentSong
                  ? formatUrlImage(song.currentSong.attributes.media.data.attributes.url)
                  : ''
              }
              controls
            />
            {authorized ? (
              <>
                <br />
                <Button
                  type="primary"
                  danger
                  shape="round"
                  hidden={isRecording}
                  icon={<VideoCameraAddOutlined />}
                  className={styles.start_recording_button}
                  onClick={() => {
                    startRecording()
                  }}
                >
                  Start Recording
                </Button>
                <Button
                  type="primary"
                  danger
                  shape="round"
                  icon={<VideoCameraOutlined />}
                  hidden={!isRecording}
                  className={styles.stopped_recording_button}
                  onClick={() => {
                    stopRecording()
                  }}
                >
                  Stop Recording
                </Button>
              </>
            ) : null}
          </Col>
          <Col span={8}>
            <h5>
              <b>Thể loại:</b>{' '}
              {song.currentSong ? MUSIC_GENRE_LABEL[song.currentSong.attributes.genre] : ''}
            </h5>
            <h5>
              {song.currentSong && song.currentSong.attributes.singers.data ? (
                <>
                  <b>Ca sĩ:</b>{' '}
                  {Array.from(
                    song.currentSong.attributes.singers.data?.map((e) => e.attributes.name),
                  ).join()}
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
      {/* <div>
        <p>{status}</p>

        <ReactPlayer width="100%" height={500} playing url={mediaBlobUrl} controls />
        <video src={mediaBlobUrl} controls autoPlay loop />
      </div>
      <br /> */}
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
