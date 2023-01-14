/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Card, Col, Input, List, Pagination, Row } from 'antd'
import SearchForm from 'components/SearchForm/SearchForm'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import SingerItem from './components/SingerItem'

const mapStateToProps = ({ singer, dispatch }) => ({
  dispatch,
  singer,
})
// Danh sách ca sĩ
const SingerListPage = ({ dispatch, singer }) => {
  useEffect(() => {
    dispatch({
      type: 'singer/GET_SINGERS',
      payload: {
        populate: '*',
        'pagination[page]': singer.pagination.current,
        'pagination[pageSize]': singer.pagination.pageSize,
      },
    })
  }, [singer.pagination.current])
  return (
    <>
      <Helmet title="Danh sách ca sĩ" />
      {/* <SearchForm /> */}
      <div style={{ width: '80%', margin: 'auto' }}>
        <Card title={<h3 style={{ fontWeight: 'bold' }}>DANH SÁCH CA SĨ</h3>}>
          <List
            loading={singer.loading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 5,
              xxl: 5,
            }}
            dataSource={singer.singerList}
            renderItem={(item) => (
              <List.Item key={Math.random()}>
                <SingerItem singer={item} />
              </List.Item>
            )}
          />
        </Card>
        <br />
        <Pagination
          {...singer.pagination}
          style={{ textAlign: 'center' }}
          onChange={(e) => {
            dispatch({
              type: 'singer/SET_STATE',
              payload: {
                pagination: {
                  ...singer.pagination,
                  current: e,
                },
              },
            })
          }}
        />
        ;
      </div>
    </>
  )
}

export default connect(mapStateToProps)(SingerListPage)
