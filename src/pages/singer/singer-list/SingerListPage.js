/* eslint-disable no-unused-vars */
import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, List, Pagination, Row } from 'antd'
import React from 'react'
import SingerItem from './components/SingerItem'

// Danh sách ca sĩ
const Singer = () => {
  const data = [
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
      name: 'Sơn Tùng MTP',
    },
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
      name: 'Sơn Tùng MTP',
    },
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
      name: 'Sơn Tùng MTP',
    },
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
      name: 'Sơn Tùng MTP',
    },
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
      name: 'Sơn Tùng MTP',
    },
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
      name: 'Sơn Tùng MTP',
    },
  ]
  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Row
        style={{
          width: '60%',
          margin: 'auto',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <Col span={20}>
          <Input
            size="large"
            style={{ borderRadius: '10px', backgroundColor: '$gray-2' }}
            prefix={<SearchOutlined />}
            placeholder="Nhập từ khóa tìm kiếm"
          />
        </Col>
        <Col span={3}>
          <Button type="primary" size="large" style={{ borderRadius: '10px' }}>
            Tìm kiếm
          </Button>
        </Col>
      </Row>
      <Card title={<h3 style={{ fontWeight: 'bold' }}>DANH SÁCH CA SĨ</h3>}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 5,
            xxl: 5,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={Math.random()}>
              <SingerItem singer={item} />
            </List.Item>
          )}
        />
      </Card>
      <br />
      <Pagination style={{ textAlign: 'center' }} defaultCurrent={1} total={50} />;
    </div>
  )
}

export default Singer
