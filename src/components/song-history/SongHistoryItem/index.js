/* eslint-disable no-unused-vars */
import { Button, Card, Col, Input, Modal, notification, Row, Tooltip } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { history } from 'index'
import formatUrlImage from 'services/ultis/helper/FormatHepler'
import copy from 'copy-to-clipboard'

const mapStateToProps = ({ dispatch, songHistory, user }) => ({
  dispatch,
  songHistory,
  user,
})
const SongHistoryItem = (props) => {
  const { item, dispatch, user, songHistory } = props
  const [hidden, setHidden] = useState(true)

  const deleteSongHistory = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'song-history/DELETE_SONG_HISTORY',
      payload: {
        id: item.id,
      },
    })
  }
  const [isOpenShareLink, setIsOpenShareLink] = useState(false)
  const shareLink = (e) => {
    e.stopPropagation()
    copy(`${window.location.origin}/public/song/${item.attributes.song.data.id}`)
    setIsOpenShareLink(false)
    notification.success({
      message: 'Đã copy đường link',
    })
  }
  return (
    <Card
      hoverable
      bordered={false}
      onClick={() => {
        history.push(`/public/song/${item.attributes.song.data.id}`)
      }}
      onMouseEnter={() => {
        setHidden(false)
      }}
      onMouseLeave={() => {
        setHidden(true)
      }}
    >
      <Row gutter={16} style={{ width: '100%' }} align="middle">
        <Col span={6}>
          <img
            src={
              item.attributes.song
                ? formatUrlImage(item.attributes.song.data.attributes.image.data.attributes.url)
                : null
            }
            style={{ width: '100%' }}
            alt=""
          />
        </Col>
        <Col span={10}>
          <h4>{item && item.attributes.song ? item.attributes.song.data.attributes.name : null}</h4>
          <div>
            {item && item.attributes.song && item.attributes.song.data.attributes.singers?.data
              ? Array.from(
                  item.attributes.song.data.attributes.singers.data?.map((e) => e.attributes.name),
                ).join()
              : null}
          </div>
        </Col>
        <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <i className="fe fe-clock" />
            {moment(item.attributes.createdAt).format('HH:mm-DD/MM/YYYY')}
          </div>
        </Col>
        <Col span={4} hidden={hidden}>
          <Row gutter={16} justify="end">
            <Col onClick={deleteSongHistory}>
              <Tooltip title="Xóa bài hát khỏi lịch sử bài hát">
                <i className="fe fe-x" style={{ fontSize: '2rem' }} />
              </Tooltip>
            </Col>
            <Col
              onClick={(e) => {
                e.stopPropagation()
                setIsOpenShareLink(true)
              }}
            >
              <Tooltip title="Chia sẻ bài hát">
                <i className="fe fe-share-2" style={{ fontSize: '2rem', color: '#1778F2' }} />
              </Tooltip>
            </Col>
            <Modal
              title={`Chia sẻ bài hát - ${
                item && item.attributes.song ? item.attributes.song.data.attributes.name : null
              }`}
              open={isOpenShareLink}
              footer={null}
              width="40%"
              centered
              onCancel={(e) => {
                e.stopPropagation()
                setIsOpenShareLink(false)
              }}
            >
              <Row gutter={16}>
                <Col span={20}>
                  <Input
                    readOnly
                    defaultValue={`${window.location.origin}/public/song/${item.attributes.song.data.id}`}
                  />
                </Col>
                <Col span={4}>
                  <Button type="primary" onClick={shareLink}>
                    Copy link
                  </Button>
                </Col>
              </Row>
            </Modal>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default connect(mapStateToProps)(SongHistoryItem)
