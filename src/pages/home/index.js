/* eslint-disable no-unused-vars */
import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Carousel, Col, Image, Input, Row } from 'antd'
import React from 'react'
import Slider from 'react-slick'

// import '~slick-carousel/slick/slick.css'
// import '~slick-carousel/slick/slick-theme.css'

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}
const Home = () => {
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
      <Row
        style={{
          width: '60%',
          margin: 'auto',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <Col span={20}>
          <Input
            size="large"
            style={{ borderRadius: '10px', backgroundColor: '$gray-2' }}
            prefix={<SearchOutlined />}
            placeholder="Nhập từ khóa tìm kiếm"
          />
        </Col>
        <Col span={3}>
          <Button type="primary" size="large" style={{ borderRadius: '10px' }}>
            Tìm kiếm
          </Button>
        </Col>
      </Row>
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
            <img src="../resources/images/sliders/danh-mat-em.jpg" alt="" />
          </div>
          <div>
            <img src="../resources/images/sliders/da-lo-yeu-em-nhieu.jpg" alt="" />
          </div>
          <div>
            <img src="../resources/images/sliders/dau-nhat-la-lang-im.jpg" alt="" />
          </div>
        </Slider>
        <br />
        <Card title="Bài hát mới nhất">Kara</Card>
        <br />
        <Card title="Bài hát hot nhất">Kara</Card>
      </div>
    </div>
  )
}

export default Home
