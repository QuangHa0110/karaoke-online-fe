/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Avatar, Card, Col, List, Row } from 'antd'
import SongItem from 'components/SongItem/SongItem'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import formatUrlImage from 'services/ultis/helper/FormatHepler'

const mapStateToProps = ({ singer, dispatch }) => ({
  dispatch,
  singer,
})
const SingerDetailPage = ({ singer, dispatch }) => {
  // get id from path url
  const { id } = useParams()

  const { currentSinger } = singer

  useEffect(() => {
    dispatch({
      type: 'singer/GET_SINGER_BY_ID',
      payload: {
        id,
      },
    })
  }, [])
 
  const songList = [
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/song/co-chac-yeu-la-day.webp`,
      name: 'Có chắc yêu là đây - Karaoke',
      singer: 'Sơn Tùng MTP',
    },
  ]
  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Card>
        <Row>
          <Col>
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 300 }}
              src={
                currentSinger && currentSinger.attributes.avatar
                  ? formatUrlImage(currentSinger.attributes.avatar.data.attributes.url)
                  : ''
              }
            />
          </Col>
          <Col>
            <h3 style={{ fontWeight: 'bold' }}>
              {currentSinger && currentSinger.attributes ? currentSinger.attributes.name : ''}
            </h3>
          </Col>
        </Row>
      </Card>
      <br />
      <Card
        title={
          <h3 style={{ fontWeight: 'bold' }}>
            BÀI HÁT KARAOKE -{' '}
            {currentSinger && currentSinger.attributes ? currentSinger.attributes.name : ''}
          </h3>
        }
      >
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={songList}
          renderItem={(song) => (
            <List.Item key={Math.random()}>
              <SongItem item={song} />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default connect(mapStateToProps)(SingerDetailPage)
