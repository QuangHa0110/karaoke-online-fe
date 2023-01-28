import { Empty, List } from 'antd'
import React from 'react'
import MySongItem from '../MySongItem'

// Bài hát của tuii
const MySongList = (props) => {
  const { data } = props
  return data.length > 0 ? (
    <List
      itemLayout="vertical"
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={Math.random()}>
          <MySongItem item={item} />
        </List.Item>
      )}
    />
  ) : (
    <Empty description="Không có dữ liệu" />
  )
}

export default MySongList
