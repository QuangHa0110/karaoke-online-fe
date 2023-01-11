/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Card, Pagination } from 'antd'
import SearchForm from 'components/SearchForm/SearchForm'
import SongList from 'components/SongList/SongList'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MUSIC_GENRE } from 'services/ultis/constants'

const mapStateToProps = ({ song, dispatch }) => ({
  dispatch,
  song,
})
// Nhạc trữ tình
const LyricalMusic = ({ dispatch, song }) => {
  const [pagination, setPagination] = useState({
    current: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    total: song.totalSongsByGenre,
  })
  useEffect(() => {
    setPagination({ ...pagination, total: song.totalSongsByGenre })
  }, [song.totalSongsByGenre])
  useEffect(() => {
    dispatch({
      type: 'song/GET_SONGS_BY_GENRE',
      payload: {
        ...pagination,
        genre: MUSIC_GENRE.LYRICAL_MUSIC,
      },
    })
  }, [pagination.current])
  return (
    <>
      <SearchForm />
      <div style={{ width: '80%', margin: 'auto' }}>
        <Card
          loading={song.loading}
          title={<h3 style={{ fontWeight: 'bold' }}>NHẠC TRỮ TÌNH KARAOKE</h3>}
        >
          <SongList data={song.songsByGenre} />
        </Card>
        <br />
        <Pagination
          {...pagination}
          style={{ textAlign: 'center' }}
          onChange={(e) => {
            setPagination({
              ...pagination,
              current: e,
            })
          }}
        />
        ;
      </div>
    </>
  )
}

export default connect(mapStateToProps)(LyricalMusic)
