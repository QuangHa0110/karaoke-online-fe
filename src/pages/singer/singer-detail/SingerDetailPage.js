/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Avatar, Card, Col, List, Pagination, Row } from 'antd'
import SongItem from 'components/SongItem/SongItem'
import SongList from 'components/SongList/SongList'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'services/ultis/constants'
import formatUrlImage from 'services/ultis/helper/FormatHepler'

const mapStateToProps = ({ singer, dispatch }) => ({
  dispatch,
  singer,
})
const SingerDetailPage = ({ singer, dispatch }) => {
  // get id from path url
  const { id } = useParams()

  const { currentSinger, totalSongOfCurrentSinger } = singer
  const [pagination, setPagination] = useState({
    current: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: totalSongOfCurrentSinger,
  })

  useEffect(() => {
    setPagination({ ...pagination, total: totalSongOfCurrentSinger })
  }, [totalSongOfCurrentSinger])

  useEffect(() => {
    dispatch({
      type: 'singer/GET_SINGER_BY_ID',
      payload: {
        id,
      },
    })
  }, [])

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Helmet
        title={currentSinger && currentSinger.attributes ? currentSinger.attributes.name : ''}
      />
      <Card>
        <Row>
          <Col>
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 300 }}
              src={
                currentSinger && currentSinger.attributes.avatar
                  ? formatUrlImage(currentSinger.attributes.avatar.data.attributes.url)
                  : ''
              }
            />
          </Col>
          <Col>
            <h3 style={{ fontWeight: 'bold' }}>
              {currentSinger && currentSinger.attributes ? currentSinger.attributes.name : ''}
            </h3>
          </Col>
        </Row>
      </Card>
      <br />
      <Card
        loading={singer.loading}
        title={
          <h3 style={{ fontWeight: 'bold' }}>
            BÀI HÁT KARAOKE -{' '}
            {currentSinger && currentSinger.attributes ? currentSinger.attributes.name : ''}
          </h3>
        }
      >
        <SongList data={singer.songsOfCurrentSinger} />
      </Card>
      {pagination.total > 0 ? (
        <>
          {' '}
          <br />
          <Pagination
            {...pagination}
            style={{ textAlign: 'center' }}
            onChange={(e) => {
              setPagination({
                ...pagination,
                current: e,
              })
              dispatch({
                type: 'singer/GET_SONGS_OF_SINGER',
                payload: {
                  id,
                  page: e,
                  pageSize: pagination.pageSize,
                },
              })
            }}
          />
        </>
      ) : null}
    </div>
  )
}

export default connect(mapStateToProps)(SingerDetailPage)
