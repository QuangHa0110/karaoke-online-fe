import { Card, Col, Row } from 'antd'
import PersonalMenu from 'components/personal/PersonalMenu'
import React from 'react'
import { Helmet } from 'react-helmet'

const MyMusic = () => {
  return (
    <div>
      <Helmet title="Bài hát yêu thích" />
      <Row gutter={16} style={{ width: '80%', margin: 'auto' }}>
        <Col span={5}>
          <PersonalMenu />
        </Col>
        <Col span={19}>
          <Card title={<h3 style={{ fontWeight: 'bold' }}>Bài hát yêu thích</h3>}>Bài hát yêu thích</Card>
        </Col>
      </Row>
    </div>
  )
}

export default MyMusic
