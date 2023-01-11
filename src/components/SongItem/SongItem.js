/* eslint-disable no-unused-vars */
import { Card } from 'antd'
import React, { useState } from 'react'
import { history } from 'index'
import formatUrlImage from 'services/ultis/helper/FormatHepler'
import { PlayCircleOutlined } from '@ant-design/icons'

const SongItem = ({ item }) => {
  return (
    <Card
      hoverable
      onClick={() => {
        history.push(`/public/song/${item.id}`)
      }}
    >
      <img
        src={
          item.attributes && item.attributes.image
            ? formatUrlImage(item.attributes.image.data.attributes.url)
            : null
        }
        style={{ width: '100%' }}
        alt=""
      />

      <div style={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: '10px' }}>
        {item && item.attributes ? item.attributes.name : ''}
      </div>

      <div style={{ marginTop: '10px' }}>
        {item.attributes && item.attributes.singer.data
          ? `Ca sĩ: ${item.attributes.singer.data.attributes.name}`
          : ''}
      </div>
    </Card>
  )
}

export default SongItem
