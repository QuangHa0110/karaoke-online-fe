/* eslint-disable no-unused-vars */
import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Radio, Form, Tooltip, Image } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

const mapStateToProps = ({ user, settings, dispatch }) => ({
  dispatch,
  user,
  authProvider: settings.authProvider,
  logo: settings.logo,
})

const Login = ({ dispatch, user, authProvider, logo }) => {
  const onFinish = (values) => {
    dispatch({
      type: 'user/LOGIN',
      payload: values,
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const changeAuthProvider = (value) => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'authProvider',
        value,
      },
    })
  }

  return (
    <div>
      <div className="text-center mb-5">
        <Link to="/">
          <Image src="../resources/images/karaoke-logo.svg" preview={false} />
        </Link>
        <h1 className="mb-5 px-3">
          <strong>Chào mừng bạn trở lại</strong>
        </h1>
      </div>
      <div className={`card ${style.container}`}>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
          initialValues={{ email: 'demo@sellpixels.com', password: 'demo123' }}
        >
          <Form.Item
            name="email"
            // label="Email"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ email' }]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            // label="Password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input size="large" type="password" placeholder="Password" />
          </Form.Item>
          <Button
            type="primary"
            size="large"
            className="text-center w-100"
            htmlType="submit"
            loading={user.loading}
          >
            <strong>Đăng nhập</strong>
          </Button>
        </Form>
        <Link to="/auth/forgot-password" className="kit__utils__link font-size-16">
          Quên mật khẩu?
        </Link>
      </div>
      <div className="text-center pt-2 mb-auto">
        <span className="mr-2">Bạn chưa có tài khoản?</span>
        <Link to="/auth/register" className="kit__utils__link font-size-16">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Login)
