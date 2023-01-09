/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Avatar, Badge } from 'antd'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

const mapStateToProps = ({ user }) => ({ user })

const ProfileMenu = ({ dispatch, user }) => {
  const logout = (e) => {
    e.preventDefault()
    dispatch({
      type: 'user/LOGOUT',
    })
  }
  const items = [
    {
      key: Math.random(),
      label: (
        <>
          <strong>
            <FormattedMessage id="topBar.profileMenu.hello" />, {user.name || 'Anonymous'}
          </strong>
          <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.role" />:{' '}
            </strong>
            {user.role || '—'}
          </div>
          <Menu.Divider />
        </>
      ),
    },
    {
      key: Math.random(),
      label: (
        <>
          <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.email" />:{' '}
            </strong>
            {user.email || '—'}
          </div>
          <Menu.Divider />
        </>
      ),
    },
    {
      key: Math.random(),
      label: (
        <a href="#" onClick={(e) => e.preventDefault()}>
          <i className="fe fe-user mr-2" />
          <FormattedMessage id="topBar.profileMenu.editProfile" />
        </a>
      ),
    },
    {
      key: Math.random(),
      label: (
        <Link to="/" onClick={logout}>
          <i className="fe fe-log-out mr-2" />
          <FormattedMessage id="topBar.profileMenu.logout" />
        </Link>
      ),
    },
  ]
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <div className={styles.dropdown}>
        <Avatar className={styles.avatar} shape="circle" size="large" icon={<UserOutlined />} />
      </div>
    </Dropdown>
  )
}

export default connect(mapStateToProps)(ProfileMenu)
