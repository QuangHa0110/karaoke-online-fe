/* eslint-disable no-unused-vars */
import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row, Table } from 'antd'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

const SongManage = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 })
  const [data, setData] = useState([])
  const columns = [
    {
      title: 'Tên bài hát',
      dataIndex: 'fullName',
      key: 'fullName',
    },
  ]
  return (
    <div>
      <Helmet title="Quản lý ca sĩ" />
      <Card title="Quản lý ca sĩ">
        <Row style={{ width: '100%' }} justify="space-between">
          <Col span={8}>
            <Input.Search placeholder="Nhập từ khóa tìm kiếm" />
          </Col>
          <Col>
            <Button style={{ backgroundColor: 'green', color: 'white' }} icon={<PlusOutlined />}>
              Thêm mới
            </Button>
          </Col>
        </Row>
        <br />
        <Row style={{ width: '100%' }}>
          <Table
            style={{ width: '100%' }}
            pagination={pagination}
            columns={columns}
            dataSource={data}
            rowKey="id"
          />
        </Row>
      </Card>
    </div>
  )
}

export default SongManage