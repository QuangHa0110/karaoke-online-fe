/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, List, Pagination, Row } from 'antd'
import SearchForm from 'components/SearchForm/SearchForm'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import qs from 'qs'
import SingerAPI from 'services/api/singer.api'
import apiClient from 'services/axios'
import config from 'services/api/config'
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
      },
    })
  }, [])
  const data = [
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
      name: 'Sơn Tùng MTP',
    },
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
      name: 'Sơn Tùng MTP',
    },
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
      name: 'Sơn Tùng MTP',
    },
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
      name: 'Sơn Tùng MTP',
    },
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
      name: 'Sơn Tùng MTP',
    },
    {
      id: Math.random(),
      imgLink: `${process.env.PUBLIC_URL}/resources/images/singer/son-tung-mtp.jpg`,
      name: 'Sơn Tùng MTP',
    },
  ]
  return (
    <>
      <SearchForm />
      <div style={{ width: '80%', margin: 'auto' }}>
        <Card title={<h3 style={{ fontWeight: 'bold' }}>DANH SÁCH CA SĨ</h3>}>
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
            dataSource={singer.singerList}
            renderItem={(item) => (
              <List.Item key={Math.random()}>
                <SingerItem singer={item} />
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

export default connect(mapStateToProps)(SingerListPage)
