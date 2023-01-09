/* eslint-disable no-unused-vars */
import { Card, Pagination } from 'antd'
import SearchForm from 'components/SearchForm/SearchForm'
import SongList from 'components/SongList/SongList'
import React from 'react'

// Nhạc rap
const RapMusic = () => {
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
  return (
    <>
      <SearchForm />
      <div style={{ width: '80%', margin: 'auto' }}>
        <Card title={<h3 style={{ fontWeight: 'bold' }}>NHẠC RAP KARAOKE</h3>}>
          <SongList data={data} />
        </Card>
        <br />
        <Pagination style={{ textAlign: 'center' }} defaultCurrent={1} total={50} />;
      </div>
    </>
  )
}

export default RapMusic