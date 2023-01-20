import { Card, Col, Row } from 'antd'
import PersonalMenu from 'components/personal/PersonalMenu'
import React from 'react'
import { Helmet } from 'react-helmet'

const PersonalInformation = () => {
  return (
    <div>
      <Helmet title="Thông tin cá nhân" />
      <Row gutter={16} style={{ width: '80%', margin: 'auto' }}>
        <Col span={5}>
          <PersonalMenu />
        </Col>
        <Col span={19}>
          <Card title={<h3 style={{ fontWeight: 'bold' }}>Thông tin cá nhân</h3>}>
            thông tin cá nhân
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PersonalInformation
