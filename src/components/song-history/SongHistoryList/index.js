import { Empty, List } from 'antd'
import React from 'react'
import SongHistoryItem from '../SongHistoryItem'

// Lịch sử bài hát đã hát
const SongHistoryList = (props) => {
  const { data } = props
  return data.length > 0 ? (
    <List
      itemLayout="vertical"
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={Math.random()}>
          <SongHistoryItem item={item} />
        </List.Item>
      )}
    />
  ) : (
    <Empty description="Không có dữ liệu" />
  )
}

export default SongHistoryList
