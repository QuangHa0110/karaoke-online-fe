/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Card, Col, Row, Skeleton } from 'antd'
import FavoriteSongList from 'components/favorite-song/FavoriteSongList'
import MySongList from 'components/my-song/MySongList'
import PersonalMenu from 'components/personal/PersonalMenu'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_TOTAL_ELEMENTS } from 'services/ultis/constants'

const mapStateToProps = ({ dispatch, user, mySong }) => ({
  dispatch,
  user,
  mySong,
})
const MyMusic = (props) => {
  const { dispatch, user, mySong } = props
  const [pagination, setPagination] = useState({
    current: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    totalMySongs: mySong.totalMySongs,
    totalPages: mySong.totalPages,
  })
  useEffect(() => {
    setPagination({
      ...pagination,
      totalPages: mySong.totalPages,
      totalFavoriteSongs: mySong.totalFavoriteSongs,
    })
  }, [mySong.totalPages, mySong.totalFavoriteSongs])
  useEffect(() => {
    dispatch({
      type: 'my-song/SET_STATE',
      payload: {
        mySongs: [],
      },
    })
  }, [])
  useEffect(() => {
    dispatch({
      type: 'my-song/GET_MY_SONGS',
      payload: {
        'pagination[page]': pagination.current,
        'pagination[pageSize]': pagination.pageSize,
        populate: '*',
        filters: {
          user: {
            id: {
              $eq: user.id,
            },
          },
        },
        sort: ['createdAt:desc'],
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
      <Helmet title="Nhạc của tui" />
      <Row gutter={16} style={{ width: '80%', margin: 'auto' }}>
        <Col span={5}>
          <PersonalMenu />
        </Col>
        <Col span={19}>
          <Card title={<h3 style={{ fontWeight: 'bold' }}>Nhạc của tui</h3>}>
            <InfiniteScroll
              key="11"
              dataLength={mySong.mySongs.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Skeleton active />}
            >
              <MySongList data={mySong.mySongs} />
            </InfiniteScroll>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default connect(mapStateToProps)(MyMusic)
