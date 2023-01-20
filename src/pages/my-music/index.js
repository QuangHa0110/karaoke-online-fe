import { Card, Col, Row } from 'antd'
import PersonalMenu from 'components/personal/PersonalMenu'
import React from 'react'
import { Helmet } from 'react-helmet'

const MyMusic = () => {
  return (
    <div>
      <Helmet title="Nhạc của tui" />
      <Row gutter={16} style={{ width: '80%', margin: 'auto' }}>
        <Col span={5}>
          <PersonalMenu />
        </Col>
        <Col span={19}>
          <Card title={<h3 style={{ fontWeight: 'bold' }}>Nhạc của tui</h3>}>nhạc của tui</Card>
        </Col>
      </Row>
    </div>
  )
}

export default MyMusic
