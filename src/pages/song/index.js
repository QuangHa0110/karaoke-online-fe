/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-unused-vars */
import { Button, Card, Row } from 'antd'
import React, { useRef } from 'react'
import ReactPlayer from 'react-player'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { Player } from 'video-react'

const Song = () => {
  const handle = useFullScreenHandle()
  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Card>
        <Row>
          <h3 style={{ fontWeight: 'bold' }}>ĐÁNH MẤT EM - QUANG ĐĂNG TRẦN - KARAOKE</h3>
        </Row>
        <Row style={{ width: '100%', height: '500px' }}>
          <ReactPlayer
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=yF1rUhDRzG0"
            controls
          />
        </Row>
      </Card>
    </div>
  )
}

export default Song
