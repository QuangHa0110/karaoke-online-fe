/* eslint-disable no-unused-vars */
import { Avatar, Card, Col, List, Row } from 'antd'
import SongItem from 'components/home/SongItem'
import React from 'react'
import { useParams } from 'react-router-dom'

const SingerDetailPage = () => {
  // get id from path url
  const { id } = useParams()
  const item = {
    id: Math.random(),
    imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
    name: 'Sơn Tùng MTP',
  }
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
              src={item.imgLink}
            />
          </Col>
          <Col>
            <h3 style={{ fontWeight: 'bold' }}>{item.name}</h3>
          </Col>
        </Row>
      </Card>
      <br />
      <Card title={<h3 style={{ fontWeight: 'bold' }}>BÀI HÁT KARAOKE - {item.name}</h3>}>
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

export default SingerDetailPage
