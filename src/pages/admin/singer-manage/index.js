/* eslint-disable no-unused-vars */
import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row, Table, Tag } from 'antd'
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Constants from 'util/constants'
import AddPopup from '../popup-manage/add'
import EditPopup from '../popup-manage/edit'
import DeletePopup from '../popup-manage/delete'

const SingerManage = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 })
  const [data, setData] = useState([])
  const [dataEdit, setDataEdit] = useState(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const titleAdd = 'Thêm ca sĩ'
  const titleEdit = 'Chỉnh sửa thông tin ca sĩ'
  const titleDelete = 'Xóa ca sĩ'

  const columns = [
    {
      title: 'Tên ca sĩ',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'avatar',
      render: (image) => <img style={{ width: '80px' }} src={image} alt="singer avatar" />,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <Tag onClick={() => showEditModal(record)} color="green">
            Chỉnh sửa
          </Tag>
          <Tag onClick={() => showDeleteModal(record)} color="volcano">
            Xóa
          </Tag>
        </>
      ),
    },
  ]
  const test = [
    {
      fullName: 'Đức Phúc',
      avatar: 'https://i.scdn.co/image/ab6761610000e5eb17b1620d6e1312038870ea7d',
    },
    {
      fullName: 'Justatee',
      avatar:
        'https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/07/22/f/e/a/2/1563758181487_600.jpg',
    },
    {
      fullName: 'Đen Vâu',
      avatar:
        'https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/08/06/9/a/7/b/1596692465856_600.jpg',
    },
    {
      fullName: 'Noo Phước Thịnh',
      avatar: 'https://image.vietnamnews.vn/uploadvnnews/Article/2017/11/20/Noo58251613PM.jpg',
    },
  ]

  const showAddModal = () => {
    setAddModalOpen(true)
  }
  const showEditModal = (record) => {
    setDataEdit(record)
    setEditModalOpen(true)
  }
  const showDeleteModal = (record) => {
    setDataEdit(record)
    setDeleteModalOpen(true)
  }
  const handleOk = () => {
    setAddModalOpen(false)
    setEditModalOpen(false)
    setDeleteModalOpen(false)
  }
  const handleCancel = () => {
    setAddModalOpen(false)
    setEditModalOpen(false)
    setDeleteModalOpen(false)
  }

  useEffect(() => {
    setData(test)
  }, [test])
  return (
    <div>
      <Helmet title="Quản lý ca sĩ" />
      <Card title="Quản lý ca sĩ">
        <Row style={{ width: '100%' }} justify="space-between">
          <Col span={8}>
            <Input.Search placeholder="Nhập từ khóa tìm kiếm" />
          </Col>
          <Col>
            <Button
              onClick={showAddModal}
              style={{ backgroundColor: 'green', color: 'white' }}
              icon={<PlusOutlined />}
            >
              Thêm mới
            </Button>
          </Col>
        </Row>
        <br />
        <Row style={{ width: '100%' }}>
          <Table
            style={{ width: '100%' }}
            pagination={pagination}
            columns={columns}
            dataSource={data}
            rowKey="id"
          />
        </Row>
      </Card>
      {addModalOpen && (
        <AddPopup
          title={titleAdd}
          isModalOpen={addModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          type={Constants.SINGER_TYPE}
        />
      )}
      {editModalOpen && (
        <EditPopup
          title={titleEdit}
          isModalOpen={editModalOpen}
          data={dataEdit}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      )}
      {deleteModalOpen && (
        <DeletePopup
          title={titleDelete}
          isModalOpen={deleteModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      )}
    </div>
  )
}

export default SingerManage
