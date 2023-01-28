import { Empty, List } from 'antd'
import React from 'react'
import FavoriteSongItem from '../FavoriteSongItem'

// Bài hát yêu thích
const FavoriteSongList = (props) => {
  const { data } = props
  return data.length > 0 ? (
    <List
      itemLayout="vertical"
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={Math.random()}>
          <FavoriteSongItem item={item} />
        </List.Item>
      )}
    />
  ) : (
    <Empty description="Không có dữ liệu" />
  )
}

export default FavoriteSongList
