/* eslint-disable no-unused-vars */
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Row } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const mapStateToProps = ({ user, dispatch }) => ({
  dispatch,
  user,
})
const PersonalMenu = (props) => {
  const { user, dispatch } = props
  const logout = (e) => {
    e.preventDefault()
    dispatch({
      type: 'user/LOGOUT',
    })
  }
  const items = [
    {
      label: <Link to="/personal-information">Thông tin cá nhân</Link>,
      key: 'personal-information',
      icon: <i className="fe fe-user mr-2" />,
    },
    {
      label: <Link to="/my-music">Nhạc của tui</Link>,
      key: 'my-music',
      icon: <i className="fe fe-music mr-2" />,
    },
    {
      label: <Link to="/song-history">Lịch sử bài hát</Link>,
      key: 'song-history',
      icon: <i className="fe fe-mic mr-2" />,
    },
    {
      label: <Link to="/change-password">Đổi mật khẩu</Link>,
      key: 'change-password',
      icon: <i className="fe fe-lock mr-2" />,
    },
    {
      label: (
        <Link to="/" onClick={logout}>
          Đăng xuất
        </Link>
      ),
      key: 'logout',
      icon: <i className="fe fe-log-out mr-2" />,
    },
  ]
  return (
    <>
      <Row justify="center">
        <Avatar
          size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
          icon={<UserOutlined />}
        />
      </Row>
      <p style={{ textAlign: 'center' }}>
        <b>{user ? user.username : 'Họ và tên'}</b>
      </p>
      <Menu
        style={{
          width: '100%',
          borderRight: 0,
        }}
        // onClick={(e) => handleChangeMenu(e)}
        // selectedKeys={selectedMenu}
        items={items}
      />
    </>
  )
}

export default connect(mapStateToProps)(PersonalMenu)
