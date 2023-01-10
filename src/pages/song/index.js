/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-unused-vars */
import { LikeOutlined } from '@ant-design/icons'
import { Button, Card, Col, List, notification, Row } from 'antd'
import SongItem from 'components/SongItem/SongItem'
import React from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { history } from 'index'
import userReducer from 'redux/user/reducers'
import actions from 'redux/user/actions'
import { CHANGE_SETTING } from 'redux/settings/sagas'

const mapStateToProps = ({ user }) => ({
  user,
  authorized: user.authorized,
})

const Song = (props) => {
  const { user, authorized } = props
  const data = [
    {
      imgLink: `${process.env.PUBLIC_URL}/resources/images/sliders/danh-mat-em.jpg`,
      name: 'Đánh mất em - Karaoke',
      singer: 'Quang Đăng Trần',
    },
    {
      imgLink: `${process.env.PUBLIC_URL}/resources/images/sliders/danh-mat-em.jpg`,
      name: 'Đánh mất em - Karaoke',
      singer: 'Quang Đăng Trần',
    },
    {
      imgLink: `${process.env.PUBLIC_URL}/resources/images/sliders/danh-mat-em.jpg`,
      name: 'Đánh mất em - Karaoke',
      singer: 'Quang Đăng Trần',
    },
    {
      imgLink: `${process.env.PUBLIC_URL}/resources/images/sliders/danh-mat-em.jpg`,
      name: 'Đánh mất em - Karaoke',
      singer: 'Quang Đăng Trần',
    },
  ]
  const handleAddYourFavoriteSong = () => {
    if (authorized) {
      notification.success({
        message: 'Thêm bài hát thành công',
      })
    } else {
      history.push('/auth/login', { previousPath: props.location.pathname })
    }
  }
  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Card>
        <Row>
          <h3 style={{ fontWeight: 'bold' }}>ĐÁNH MẤT EM - QUANG ĐĂNG TRẦN - KARAOKE</h3>
        </Row>
        <br />
        <Row gutter={[30, 30]}>
          <Col span={16}>
            <ReactPlayer
              width="100%"
              height={500}
              url="https://www.youtube.com/watch?v=yF1rUhDRzG0"
              controls
            />
          </Col>
          <Col span={8}>
            <h5>
              <b>Thể loại:</b> Nhạc trẻ karaoke
            </h5>
            <h5>
              <b>Ca sĩ:</b> Quang Đăng Trần
            </h5>
            <div style={{ width: '100%', textAlign: 'center', marginTop: '50px' }}>
              <Button
                type="primary"
                size="large"
                shape="round"
                icon={<LikeOutlined />}
                onClick={handleAddYourFavoriteSong}
              >
                Thêm vào danh sách bài hát yêu thích
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
      <br />
      <Card title={<h3 style={{ fontWeight: 'bold' }}>BÀI HÁT CÙNG CA SĨ</h3>}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={Math.random()}>
              <SongItem item={item} />
            </List.Item>
          )}
        />
      </Card>
      <br />
      <Card title={<h3 style={{ fontWeight: 'bold' }}>BÀI HÁT CÙNG THỂ LOẠI</h3>}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={Math.random()}>
              <SongItem item={item} />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(Song))
