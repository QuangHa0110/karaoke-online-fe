/* eslint-disable no-unused-vars */
import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Carousel, Col, Image, Input, List, Row } from 'antd'
import SongItem from 'components/SongItem/SongItem'
import SearchForm from 'components/SearchForm/SearchForm'
import React from 'react'
import ReactPlayer from 'react-player'
import Slider from 'react-slick'

const Home = () => {
  const data = [
    {
      imgLink: '../resources/images/sliders/danh-mat-em.jpg',
      name: 'Đánh mất em - Karaoke',
      singer: 'Quang Đăng Trần',
    },
    {
      imgLink: '../resources/images/sliders/danh-mat-em.jpg',
      name: 'Đánh mất em - Karaoke',
      singer: 'Quang Đăng Trần',
    },
    {
      imgLink: '../resources/images/sliders/danh-mat-em.jpg',
      name: 'Đánh mất em - Karaoke',
      singer: 'Quang Đăng Trần',
    },
    {
      imgLink: '../resources/images/sliders/danh-mat-em.jpg',
      name: 'Đánh mất em - Karaoke',
      singer: 'Quang Đăng Trần',
    },
    {
      imgLink: '../resources/images/sliders/danh-mat-em.jpg',
      name: 'Đánh mất em - Karaoke',
      singer: 'Quang Đăng Trần',
    },
    {
      imgLink: '../resources/images/sliders/danh-mat-em.jpg',
      name: 'Đánh mất em - Karaoke',
      singer: 'Quang Đăng Trần',
    },
  ]
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <div>
      <SearchForm />
      <div style={{ width: '80%', margin: 'auto' }}>
        <Slider {...settings}>
          <div>
            <img src="../resources/images/sliders/da-lo-yeu-em-nhieu.jpg" alt="" />
          </div>
          <div>
            <img src="../resources/images/sliders/danh-mat-em.jpg" alt="" />
          </div>
          <div>
            <img src="../resources/images/sliders/dau-nhat-la-lang-im.jpg" alt="" />
          </div>
          <div>
            <img src="../resources/images/sliders/beauty-and-a-beat.jpg" alt="" />
          </div>
        </Slider>
        <br />
        <Card title={<h3 style={{ fontWeight: 'bold' }}>BÀI HÁT MỚI NHẤT</h3>}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
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
        <Card title={<h3 style={{ fontWeight: 'bold' }}>BÀI HÁT HOT NHẤT</h3>}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <SongItem item={item} />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  )
}

export default Home
