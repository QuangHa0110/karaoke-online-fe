import { Card } from 'antd'
import { history } from 'index'
import React from 'react'

const SingerItem = (props) => {
  const { singer } = props
  return (
    <div>
      <Card
        hoverable
        onClick={() => {
          history.push(`/public/singer/${singer.id}`)
        }}
      >
        <img src={singer.imgLink} style={{ width: '100%' }} alt="" />

        <div
          style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '10px', textAlign: 'center' }}
        >
          {singer.name}
        </div>
      </Card>
    </div>
  )
}

export default SingerItem
