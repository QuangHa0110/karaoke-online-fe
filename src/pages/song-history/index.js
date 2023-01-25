/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { DeleteOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Affix, Card, Checkbox, Col, Row, Skeleton } from 'antd'
import PersonalMenu from 'components/personal/PersonalMenu'
import SongHistoryList from 'components/song-history/SongHistoryList'
import { func } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'services/ultis/constants'

const mapStateToProps = ({ dispatch, songHistory, user }) => ({
  dispatch,
  songHistory,
  user,
})

const SongHistory = (props) => {
  const { dispatch, songHistory, user } = props

  const [pagination, setPagination] = useState({
    current: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    totalSongHistories: songHistory.totalSongHistories,
    totalPages: songHistory.totalPages,
  })
  useEffect(() => {
    setPagination({
      ...pagination,
      totalPages: songHistory.totalPages,
      totalSongHistories: songHistory.totalSongHistories,
    })
  }, [songHistory.totalPages, songHistory.totalSongHistories])
  useEffect(() => {
    dispatch({
      type: 'song-history/SET_STATE',
      payload: {
        songHistories: [],
      },
    })
  }, [])

  useEffect(() => {
    dispatch({
      type: 'song-history/GET_SONG_HISTORIES',

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
        sort: ['createdAt:desc'],
      },
    })
  }, [pagination.current])

  const fetchMoreData = () => {
    setPagination({ ...pagination, current: pagination.current + 1 })
  }

  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (pagination.totalSongHistories > 300) {
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
      <Helmet title="Lịch sử bài hát" />
      <Row gutter={16} style={{ width: '80%', margin: 'auto' }}>
        <Col span={5}>
          <PersonalMenu />
        </Col>
        <Col span={19}>
          <Card title={<h3 style={{ fontWeight: 'bold' }}>Lịch sử bài hát</h3>}>
            <InfiniteScroll
              key="11"
              dataLength={songHistory.songHistories.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Skeleton active />}
              // endMessage={<div style={{ textAlign: 'center' }}>Bạn đã xem hết thông báo</div>}
            >
              <SongHistoryList data={songHistory.songHistories} />
            </InfiniteScroll>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default connect(mapStateToProps)(SongHistory)
