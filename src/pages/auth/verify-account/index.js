/* eslint-disable no-unused-vars */
import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Col, Image, Row } from 'antd'
import React from 'react'
import { Helmet } from 'react-helmet'
import { history } from 'index'

const SystemVerifyAccount = () => {
  return (
    <>
      <div style={{ width: '100%', paddingTop: '30%' }}>
        <Helmet title="Xác nhận tài khoản" />
        <Row style={{ width: '100%' }} justify="space-around" align="middle">
          <CheckCircleOutlined style={{ fontSize: 100, color: '#41b883' }} />
          <span style={{ fontSize: 40 }}>Xác nhận tài khoản thành công</span>
          <br />
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => {
              history.push('/auth/login')
            }}
          >
            Đăng nhập
          </Button>
        </Row>
      </div>
    </>
  )
}

export default SystemVerifyAccount
