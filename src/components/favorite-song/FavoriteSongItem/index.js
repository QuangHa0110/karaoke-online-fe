/* eslint-disable no-unused-vars */
import { Card, Col, Row, Tooltip } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { history } from 'index'
import formatUrlImage from 'services/ultis/helper/FormatHepler'

const mapStateToProps = ({ dispatch, songHistory, user }) => ({
  dispatch,
  songHistory,
  user,
})
const FavoriteSongItem = (props) => {
  const { item, dispatch, user, songHistory } = props
  const [hidden, setHidden] = useState(true)

  const deleteFavoriteSong = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'favorite-song/REMOVE_FAVORITE_SONG',
      payload: {
        id: item.id,
      },
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
            {item && item.attributes.song && item.attributes.song.data.attributes.singer.data
              ? item.attributes.song.data.attributes.singer.data.attributes.name
              : null}
          </div>
        </Col>

        <Col span={8} hidden={hidden}>
          <Row gutter={16} justify="end">
            <Col onClick={deleteFavoriteSong}>
              <Tooltip title="Bỏ thích">
                <i className="fe fe-heart" style={{ fontSize: '2rem', color: '#FE251B' }} />
              </Tooltip>
            </Col>
            <Col>
              <i className="fe fe-share-2" style={{ fontSize: '2rem', color: '#1778F2' }} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default connect(mapStateToProps)(FavoriteSongItem)
