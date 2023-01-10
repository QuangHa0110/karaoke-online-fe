import { Card } from 'antd'
import { history } from 'index'
import React from 'react'
import formatUrlImage from 'services/ultis/helper/FormatHepler'

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
        <img
          src={
            singer.attributes.avatar && singer.attributes.avatar.data
              ? formatUrlImage(singer.attributes.avatar.data.attributes.url)
              : ''
          }
          style={{ width: '100%' }}
          alt=""
        />

        <div
          style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '10px', textAlign: 'center' }}
        >
          {singer.attributes.name}
        </div>
      </Card>
    </div>
  )
}

export default SingerItem
