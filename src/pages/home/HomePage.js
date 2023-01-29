/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Carousel, Col, Image, Input, List, Row } from 'antd'
import SongItem from 'components/SongItem/SongItem'
import SearchForm from 'components/SearchForm/SearchForm'
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import Slider from 'react-slick'
import SongList from 'components/SongList/SongList'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

const mapStateToProps = ({ song, dispatch, slide }) => ({
  dispatch,
  song,
  slide,
})

const Home = ({ song, dispatch, slide }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  }

  useEffect(() => {
    dispatch({
      type: 'song/GET_LATEST_SONGS',
    })
    dispatch({
      type: 'song/GET_HOT_SONGS',
    })
    dispatch({
      type: 'slide/GET_SLIDES',
      payload: {
        populate: '*',
      },
    })
  }, [])

  return (
    <div>
      <Helmet title="Trang chủ" />
      {/* <SearchForm /> */}
      <div style={{ width: '80%', margin: 'auto' }}>
        <Slider {...settings}>
          {slide.slides?.map((element) => {
            return (
              <div key={element.id}>
                <img
                  src={element.attributes.image.data.attributes.url}
                  style={{ margin: 'auto' }}
                  alt=""
                />
              </div>
            )
          })}
        </Slider>
        <br />
        <Card title={<h3 style={{ fontWeight: 'bold' }}>BÀI HÁT MỚI NHẤT</h3>}>
          <SongList data={song.latestSongs} />
        </Card>
        <br />
        <Card title={<h3 style={{ fontWeight: 'bold' }}>BÀI HÁT HOT NHẤT</h3>}>
          <SongList data={song.hotSongs} />
        </Card>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Home)
