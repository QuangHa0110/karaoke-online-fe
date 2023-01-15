/* eslint-disable no-unused-vars */
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Checkbox, Col, Form, Input, Row } from 'antd'
import PersonalMenu from 'components/personal/PersonalMenu'
import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

const mapStateToProps = ({ user, dispatch }) => ({
  dispatch,
  user,
})
const SystemChangePassword = (props) => {
  const { user, dispatch } = props
  const onFinish = (values) => {
    dispatch({
      type: 'user/CHANGE_PASSWORD',
      payload: values,
    })
  }
  return (
    <div>
      <Helmet title="Đổi mật khẩu" />
      <Row gutter={16} style={{ width: '80%', margin: 'auto' }}>
        <Col span={5}>
          <Card>
            <PersonalMenu />
          </Card>
        </Col>
        <Col span={19}>
          <Card title={<h3 style={{ fontWeight: 'bold' }}>ĐỔI MẬT KHẨU</h3>}>
            <Form
              name="change-password"
              layout="vertical"
              labelCol={{
                offset: 4,
                span: 4,
              }}
              wrapperCol={{
                offset: 4,
                span: 16,
              }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Mật khẩu hiện tại"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập mật khẩu hiện tại của bạn',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Mật khẩu mới"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập mật khẩu mới',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Nhập lại mật khẩu mới"
                name="passwordConfirmation"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập mật khẩu mới',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Mật khẩu mới không trùng khớp'))
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 10,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" shape="round">
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default connect(mapStateToProps)(SystemChangePassword)
