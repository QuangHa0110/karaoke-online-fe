/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Empty, Input, List, Pagination, Row } from 'antd'
import SongItem from 'components/SongItem/SongItem'
import SearchForm from 'components/SearchForm/SearchForm'
import SingerItem from 'pages/singer/singer-list/components/SingerItem'
import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'services/ultis/constants'
import SongList from 'components/SongList/SongList'
import { Helmet } from 'react-helmet'

const mapStateToProps = ({ search, dispatch }) => ({
  dispatch,
  search,
})
const SearchResultPage = (props) => {
  const { search, dispatch } = props
  const searchParams = new URLSearchParams(useLocation().search)
  const [paginationSinger, setPaginationSinger] = useState({
    current: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: search.totalSingers,
  })
  const [paginationSong, setPaginationSong] = useState({
    current: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: search.totalSongs,
  })

  const [keyword, setKeyword] = useState()

  useEffect(() => {
    setKeyword(searchParams.get('keyword'))
  }, [searchParams.get('keyword')])
  useEffect(() => {
    setPaginationSinger({ ...paginationSinger, total: search.totalSingers })
    setPaginationSong({ ...paginationSong, total: search.totalSongs })
  }, [search])
  useEffect(() => {
    dispatch({
      type: 'search/SEARCH_SONG',
      payload: {
        populate: '*',
        'pagination[page]': paginationSong.current,
        'pagination[pageSize]': paginationSong.pageSize,
        sort: ['name:asc'],
        filters: {
          name: {
            $contains: searchParams.get('keyword'),
          },
        },
      },
    })
  }, [searchParams.get('keyword'), paginationSong.current])
  useEffect(() => {
    dispatch({
      type: 'search/SEARCH_SINGER',
      payload: {
        populate: '*',
        'pagination[page]': paginationSinger.current,
        'pagination[pageSize]': paginationSinger.pageSize,
        sort: ['name:asc'],
        filters: {
          name: {
            $contains: searchParams.get('keyword'),
          },
        },
      },
    })
  }, [searchParams.get('keyword'), paginationSinger.current])
  return (
    <div>
      <Helmet title="Kết quả tìm kiếm" />
      {/* <SearchForm /> */}

      <div style={{ width: '80%', margin: 'auto' }}>
        <h4>Từ khóa tìm kiếm "{keyword}"</h4>
        <br />
        <Card title={<h3 style={{ fontWeight: 'bold' }}>CA SĨ</h3>}>
          {search.singers.length > 0 ? (
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
              dataSource={search.singers}
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

        {paginationSinger.total ? (
          <>
            <br />
            <Pagination
              {...paginationSinger}
              style={{ textAlign: 'center' }}
              onChange={(e) => {
                setPaginationSinger({
                  ...paginationSinger,
                  current: e,
                })
              }}
            />
          </>
        ) : null}

        <br />
        <Card title={<h3 style={{ fontWeight: 'bold' }}>BÀI HÁT</h3>}>
          <SongList data={search.songs} />
        </Card>

        {paginationSong.total > 0 ? (
          <>
            <br />
            <Pagination
              {...paginationSong}
              style={{ textAlign: 'center' }}
              onChange={(e) => {
                setPaginationSong({
                  ...paginationSong,
                  current: e,
                })
              }}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(SearchResultPage)
