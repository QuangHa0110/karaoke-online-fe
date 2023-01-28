/* eslint-disable no-unused-vars */
import { Button, Card, Col, Input, Modal, notification, Row, Tooltip } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { history } from 'index'
import formatUrlImage from 'services/ultis/helper/FormatHepler'
import copy from 'copy-to-clipboard'
import ReactPlayer from 'react-player'
import { HeartOutlined } from '@ant-design/icons'

const mapStateToProps = ({ dispatch, mySong, user }) => ({
  dispatch,
  mySong,
  user,
})
const MySongItem = (props) => {
  const { item, dispatch, user, mySong } = props
  const [hidden, setHidden] = useState(true)

  const deleteFavoriteSong = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'my-song/DELETE_MY_SONG_BY_ID',
      payload: {
        id: item.id,
        name: item.attributes.name,
      },
    })
  }

  const [isOpenShareLink, setIsOpenShareLink] = useState(false)
  const shareLink = (e) => {
    e.stopPropagation()
    copy(formatUrlImage(item.attributes.video.data.attributes.url))
    setIsOpenShareLink(false)
    notification.success({
      message: 'Đã copy đường link',
    })
  }
  return (
    <Card
      hoverable
      bordered={false}
      onMouseEnter={() => {
        setHidden(false)
      }}
      onMouseLeave={() => {
        setHidden(true)
      }}
    >
      <Row gutter={16} style={{ width: '100%' }} align="middle">
        <Col span={12}>
          <ReactPlayer
            width="100%"
            url={
              item.attributes.video
                ? formatUrlImage(item.attributes.video.data.attributes.url)
                : null
            }
            controls
          />
        </Col>
        <Col span={6}>
          <h5>{item ? item.attributes.name : null}</h5>
          <div>
            <i className="fe fe-clock" />
            {moment(item.attributes.createdAt).format('HH:mm-DD/MM/YYYY')}
          </div>
        </Col>

        <Col span={6} hidden={hidden}>
          <Row gutter={16} justify="end">
            <Col onClick={deleteFavoriteSong}>
              <Tooltip title="Xóa bài hát">
                <i className="fe fe-x" style={{ fontSize: '2rem', color: '#FE251B' }} />
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
              title={`Chia sẻ bài hát - ${item ? item.attributes.name : null}`}
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
                    defaultValue={formatUrlImage(item.attributes.video.data.attributes.url)}
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

export default connect(mapStateToProps)(MySongItem)
