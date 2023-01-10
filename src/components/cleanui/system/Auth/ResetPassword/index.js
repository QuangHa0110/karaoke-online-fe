/* eslint-disable no-unused-vars */
import React from 'react'
import { Input, Button, Form, Image, notification } from 'antd'
import { Link, useLocation, useParams } from 'react-router-dom'
import AuthAPI from 'services/api/auth.api'
import { connect } from 'react-redux'
import style from '../style.module.scss'

const mapStateToProps = ({ user, dispatch }) => ({ user, dispatch })

const ResetPassword = ({ dispatch, user }) => {
  const { search } = useLocation()
  const searchParam = new URLSearchParams(search)

  const onFinish = (values) => {
    const payload = {
      ...values,
      code: searchParam.get('code'),
    }
    dispatch({
      type: 'user/RESET_PASSWORD',
      payload,
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <div className="text-center mb-5">
        <Image
          src={`${process.env.PUBLIC_URL}/resources/images/karaoke-logo.svg`}
          preview={false}
        />
      </div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 mb-4">
          <strong>Đặt lại mật khẩu</strong>
        </div>
        <Form
          layout="vertical"
          requiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mb-4"
        >
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn' }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item
            label="Xác nhận lại mật khẩu"
            name="passwordConfirmation"
            rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu' }]}
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
            <strong>Đặt lại mật khẩu</strong>
          </Button>
        </Form>
        <Link to="/auth/login" className="kit__utils__link font-size-16">
          <i className="fe fe-arrow-left mr-1 align-middle" />
          Quay lại trang đăng nhập
        </Link>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(ResetPassword)
