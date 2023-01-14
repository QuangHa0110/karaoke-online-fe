import { SearchOutlined } from '@ant-design/icons'
import { Button, Col, Input, Row } from 'antd'
import { history } from 'index'
import React, { useState } from 'react'

const SearchForm = () => {
  const [keyword, setKeyword] = useState()
  return (
    <div>
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
            onChange={(e) => {
              setKeyword(e.target.value)
            }}
            onPressEnter={() => {
              if (keyword) {
                history.push({
                  pathname: '/public/search',
                  search: `keyword=${keyword}`,
                })
              }
            }}
          />
        </Col>
        <Col span={3}>
          <Button
            type="primary"
            size="large"
            style={{ borderRadius: '10px' }}
            onClick={() => {
              if (keyword) {
                history.push({
                  pathname: '/public/search',
                  search: `keyword=${keyword}`,
                })
              }
            }}
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default SearchForm
