/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Card, Col, Row, Skeleton } from 'antd'
import FavoriteSongList from 'components/favorite-song/FavoriteSongList'
import PersonalMenu from 'components/personal/PersonalMenu'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_TOTAL_ELEMENTS } from 'services/ultis/constants'

const mapStateToProps = ({ dispatch, user, favoriteSong }) => ({
  dispatch,
  user,
  favoriteSong,
})
const FavoriteSong = (props) => {
  const { dispatch, user, favoriteSong } = props
  const [pagination, setPagination] = useState({
    current: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    totalFavoriteSongs: favoriteSong.totalFavoriteSongs,
    totalPages: favoriteSong.totalPages,
  })
  useEffect(() => {
    setPagination({
      ...pagination,
      totalPages: favoriteSong.totalPages,
      totalFavoriteSongs: favoriteSong.totalFavoriteSongs,
    })
  }, [favoriteSong.totalPages, favoriteSong.totalFavoriteSongs])
  useEffect(() => {
    dispatch({
      type: 'favorite-song/SET_STATE',
      payload: {
        favoriteSongs: [],
      },
    })
  }, [])
  useEffect(() => {
    dispatch({
      type: 'favorite-song/GET_FAVORITE_SONGS',
      payload: {
        'pagination[page]': pagination.current,
        'pagination[pageSize]': pagination.pageSize,
        populate: ['song.image', 'song.singer'],
        filters: {
          user: {
            id: {
              $eq: user.id,
            },
          },
        },
        sort: ['song.name:asc'],
      },
    })
  }, [pagination.current])

  const fetchMoreData = () => {
    setPagination({ ...pagination, current: pagination.current + 1 })
  }

  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (pagination.totalSongHistories > DEFAULT_TOTAL_ELEMENTS) {
      setHasMore(false)
    } else if (pagination.totalSongHistories < DEFAULT_PAGE_SIZE) {
      setHasMore(false)
    } else if (pagination.totalPages <= pagination.current) {
      setHasMore(false)
    } else {
      setHasMore(true)
    }
  }, [pagination])
  return (
    <div>
      <Helmet title="Bài hát yêu thích" />
      <Row gutter={16} style={{ width: '80%', margin: 'auto' }}>
        <Col span={5}>
          <PersonalMenu />
        </Col>
        <Col span={19}>
          <Card title={<h3 style={{ fontWeight: 'bold' }}>Bài hát yêu thích</h3>}>
            <InfiniteScroll
              key="11"
              dataLength={favoriteSong.favoriteSongs.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Skeleton active />}
              // endMessage={<div style={{ textAlign: 'center' }}>Bạn đã xem hết thông báo</div>}
            >
              <FavoriteSongList data={favoriteSong.favoriteSongs} />
            </InfiniteScroll>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default connect(mapStateToProps)(FavoriteSong)
