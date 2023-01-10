import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import Layout from 'layouts'

const routes = [
  // Trang chủ
  {
    path: '/public/home',
    Component: lazy(() => import('pages/home/HomePage')),
    exact: true,
  },
  {
    path: '/public/song/:id',
    Component: lazy(() => import('pages/song')),
    exact: true,
  },
 

  // Nhạc trẻ karaoke
  {
    path: '/public/young-music',
    Component: lazy(() => import('pages/category/young-music/YoungMusicPage')),
    exact: true,
  },
  // Nhạc trữ tình karaoke
  {
    path: '/public/lyrical-music',
    Component: lazy(() => import('pages/category/lyrical-music/LyricalMusicPage')),
    exact: true,
  },

  // Nhạc thiếu nhi karaoke
  {
    path: '/public/children-music',
    Component: lazy(() => import('pages/category/children-music/ChildrenMusicPage')),
    exact: true,
  },

  // Nhạc giáng sinh karaoke
  {
    path: '/public/christmas-music',
    Component: lazy(() => import('pages/category/christmas-music/ChristmasMusicPage')),
    exact: true,
  },

  // Nhạc rap karaoke
  {
    path: '/public/rap-music',
    Component: lazy(() => import('pages/category/rap-music/RapMusicPage')),
    exact: true,
  },

  // Nhạc theo ca sĩ
  {
    path: '/public/singer',
    Component: lazy(() => import('pages/singer/singer-list/SingerListPage')),
    exact: true,
  },

  {
    path: '/public/singer/:id',
    Component: lazy(() => import('pages/singer/singer-detail/SingerDetailPage')),
    exact: true,
  },

  // Quản lý tài khoản
  {
    path: '/manage/account',
    Component: lazy(() => import('pages/admin/account-manage')),
    exact: true,
  },

  // Quản lý ca sĩ
  {
    path: '/manage/singer',
    Component: lazy(() => import('pages/admin/singer-manage')),
    exact: true,
  },

  // Quản lý bài hát
  {
    path: '/manage/song',
    Component: lazy(() => import('pages/admin/song-manage')),
    exact: true,
  },
  {
    path: '/public/search',
    Component: lazy(() => import('pages/search-result/SearchResultPage')),
    exact: true,
  },

  // Auth Pages
  {
    path: '/auth/login',
    Component: lazy(() => import('pages/auth/login')),
    exact: true,
  },
  {
    path: '/auth/forgot-password',
    Component: lazy(() => import('pages/auth/forgot-password')),
    exact: true,
  },
  {
    path: '/auth/reset-password',
    Component: lazy(() => import('pages/auth/reset-password/ResetPassword')),
    exact: true,
  },
  
  {
    path: '/auth/register',
    Component: lazy(() => import('pages/auth/register')),
    exact: true,
  },
  {
    path: '/auth/lockscreen',
    Component: lazy(() => import('pages/auth/lockscreen')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('pages/auth/404')),
    exact: true,
  },
  {
    path: '/auth/500',
    Component: lazy(() => import('pages/auth/500')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

const Router = ({ history, routerAnimation }) => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route
          render={(state) => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  classNames={routerAnimation}
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>
                    <Route exact path="/" render={() => <Redirect to="/public/home" />} />
                    {routes.map(({ path, Component, exact }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => {
                          return (
                            <div className={routerAnimation}>
                              <Suspense fallback={null}>
                                <Component />
                              </Suspense>
                            </div>
                          )
                        }}
                      />
                    ))}
                    <Redirect to="/auth/404" />
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
