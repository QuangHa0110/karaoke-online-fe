/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Empty, Input, List, Row } from 'antd'
import SongItem from 'components/home/SongItem'
import SearchForm from 'components/SearchForm'
import SingerItem from 'pages/singer/components/SingerItem'
import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const SearchResultPage = () => {
  const search = new URLSearchParams(useLocation().search)

  const [keyword, setKeyword] = useState()

  // danh sách bài hát được tìm thấy
  const [songList, setSongList] = useState([])
  // danh sách ca sĩ được tìm thấy
  const [singerList, setSingerList] = useState([])

  useEffect(() => {
    setKeyword(search.get('keyword'))
  }, [search])
  return (
    <div>
      <SearchForm />

      <div style={{ width: '80%', margin: 'auto' }}>
        <h4>Từ khóa tìm kiếm "{keyword}"</h4>
        <br />
        <Card title={<h3 style={{ fontWeight: 'bold' }}>CA SĨ</h3>}>
          {singerList.length > 0 ? (
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 5,
                xxl: 5,
              }}
              dataSource={singerList}
              renderItem={(item) => (
                <List.Item key={Math.random()}>
                  <SingerItem singer={item} />
                </List.Item>
              )}
            />
          ) : (
            <Empty description="Không có dữ liệu" />
          )}
        </Card>
        <br />
        <Card title={<h3 style={{ fontWeight: 'bold' }}>BÀI HÁT</h3>}>
          {songList.length > 0 ? (
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 5,
                xxl: 5,
              }}
              dataSource={songList}
              renderItem={(item) => (
                <List.Item key={Math.random()}>
                  <SongItem singer={item} />
                </List.Item>
              )}
            />
          ) : (
            <Empty description="Không có dữ liệu" />
          )}
        </Card>
      </div>
    </div>
  )
}

export default SearchResultPage
