/* eslint-disable no-unused-vars */
import { Button, Col, Input, Row } from 'antd'
import { history } from 'index'
import React, { useState } from 'react'

const SearchForm = () => {
  return (
    <Row
      style={{
        width: '60%',
        margin: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Col span={20}>
        <Input.Search
          size="large"
          style={{ borderRadius: '10px', backgroundColor: '$gray-2' }}
          placeholder="Nhập từ khóa tìm kiếm"
          allowClear
          onSearch={(keyword) => {
            if (keyword) {
              history.push({
                pathname: '/public/search',
                search: `keyword=${keyword}`,
              })
            }
          }}
        />
      </Col>
      {/* <Col span={3}>
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
      </Col> */}
    </Row>
  )
}

export default SearchForm
