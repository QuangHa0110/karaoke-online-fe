/* eslint-disable no-unused-vars */
import { Card } from 'antd'
import React from 'react'
import { history } from 'index'

const SongItem = ({ item }) => {
  return (
    <Card
      hoverable
      onClick={() => {
        history.push(`/public/song/${Math.floor(Math.random() * (100 - 1 + 1)) + 1}`)
      }}
    >
      <img src={item.imgLink} style={{ width: '100%' }} alt="" />

      <div style={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: '10px' }}>{item.name}</div>

      <div style={{ marginTop: '10px' }}>Ca sĩ: {item.singer}</div>
    </Card>
    
  )
}

export default SongItem
