/* eslint-disable no-unused-vars */
import { Card, List } from 'antd'
import React from 'react'
import SingerItem from './components/SingerItem'

// Danh sách ca sĩ
const Singer = () => {
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
    <div>
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
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={Math.random()}>
              <SingerItem singer={item} />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default Singer
