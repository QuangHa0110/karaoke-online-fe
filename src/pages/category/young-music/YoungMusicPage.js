/* eslint-disable no-unused-vars */
import { Card, List, Pagination } from 'antd'
import SearchForm from 'components/SearchForm/SearchForm'
import SongItem from 'components/SongItem/SongItem'
import React from 'react'

// Nhạc trẻ
const YoungMusic = () => {
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
        <Card title={<h3 style={{ fontWeight: 'bold' }}>NHẠC TRẺ KARAOKE</h3>}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 4,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <SongItem item={item} />
              </List.Item>
            )}
          />
        </Card>
        <br />
        <Pagination style={{ textAlign: 'center' }} defaultCurrent={1} total={50} />;
      </div>
    </>
  )
}

export default YoungMusic
