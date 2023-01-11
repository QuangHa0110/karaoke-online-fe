import { List } from 'antd'
import SongItem from 'components/SongItem/SongItem'
import React from 'react'

// Danh sách bài hát
const SongList = (props) => {
  const { data } = props
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={Math.random()}>
          <SongItem item={item} />
        </List.Item>
      )}
    />
  )
}

export default SongList
