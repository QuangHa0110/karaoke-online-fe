/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from 'antd'
import { useNavigate, withRouter } from 'react-router-dom'
import { history } from 'index'
import { connect } from 'react-redux'
import FavPages from './FavPages'
import Search from './Search'
import IssuesHistory from './IssuesHistory'
import ProjectManagement from './ProjectManagement'
import LanguageSwitcher from './LanguageSwitcher'
import Actions from './Actions'
import UserMenu from './UserMenu'
import style from './style.module.scss'

const mapStateToProps = ({ user }) => ({
  user,
  authorized: user.authorized,
})

const TopBar = ({ authorized, user }) => {
  console.log('🚀 ~ file: index.js:22 ~ TopBar ~ user', user)

  return (
    <div className={style.topbar}>
      {!authorized ? (
        <>
          {' '}
          <div className="mr-4 d-none d-sm-block">
            <Button type="primary" shape="round" onClick={() => history.push('/auth/login')}>
              Đăng nhập
            </Button>
          </div>
          <div className="mr-4 d-none d-sm-block">
            <Button type="primary" shape="round" onClick={() => history.push('/auth/register')}>
              Đăng ký
            </Button>
          </div>
        </>
      ) : null}

      {authorized ? (
        <div className="">
          <UserMenu />
        </div>
      ) : null}
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(TopBar))
