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
      <div className="text-center mb-3">
        <Link to="/">
          <Image
            src={`${process.env.PUBLIC_URL}/resources/images/karaoke-logo.svg`}
            preview={false}
          />
        </Link>
      </div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 mb-4">
          <strong>Chào mừng bạn đến với KaraokeOnline</strong>
        </div>
        <div className="mb-4">
          <p>Hãy cùng thỏa sức đam mê, hát vui bất tận cùng chúng tôi</p>
        </div>
        <Form layout="vertical" requiredMark onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: 'email', message: 'Vui lòng nhập địa chỉ email của bạn' },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn' }]}
          >
            <Input.Password size="large" />
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
