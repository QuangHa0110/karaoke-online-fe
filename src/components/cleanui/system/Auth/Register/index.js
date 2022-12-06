import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Form, Image } from 'antd'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'

const mapStateToProps = ({ user, dispatch }) => ({ user, dispatch })

const Register = ({ dispatch, user }) => {
  const onFinish = (values) => {
    dispatch({
      type: 'user/REGISTER',
      payload: values,
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <div className="text-center mb-5">
        <Link to="/">
          <Image src="../resources/images/karaoke-logo.svg" preview={false} />
        </Link>
      </div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 mb-4">
          <strong>Chào mừng bạn đến với KaraokeOnline</strong>
        </div>
        <div className="mb-4">
          <p>Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</p>
        </div>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
        >
          <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
            <Input size="large" placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ email của bạn' }]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn' }]}
          >
            <Input type="password" size="large" placeholder="Password" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="text-center w-100"
            loading={user.loading}
          >
            <strong>Đăng ký</strong>
          </Button>
        </Form>
        {/* <div>
          <span className="mr-1">By signing up, you agree to the</span>
          <a href="#" onClick={e => e.preventDefault()} className="kit__utils__link">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" onClick={e => e.preventDefault()} className="kit__utils__link">
            Privacy Policy
          </a>
        </div> */}
      </div>
      <div className="text-center pt-2 mb-auto">
        <span className="mr-2">Bạn đã có tài khoản?</span>
        <Link to="/auth/login" className="kit__utils__link font-size-16">
          Đăng nhập
        </Link>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Register)
