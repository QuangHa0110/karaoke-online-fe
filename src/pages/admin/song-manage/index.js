/* eslint-disable no-unused-vars */
import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row, Table, Tag } from 'antd'
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Constants from 'util/constants'
import AddPopup from '../popup-manage/add'
import EditPopup from '../popup-manage/edit'
import DeletePopup from '../popup-manage/delete'

const SongManage = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 })
  const [data, setData] = useState([])
  const [dataEdit, setDataEdit] = useState(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const titleAdd = 'Thêm bài hát'
  const titleEdit = 'Chỉnh sửa thông tin bài hát'
  const titleDelete = 'Xóa bài hát'

  const columns = [
    {
      title: 'Tên bài hát',
      dataIndex: 'fullName',
      key: 'fullName',
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
      fullName: 'Đã lỡ yêu em nhiều',
    },
    {
      fullName: 'Đánh mất em',
    },
    {
      fullName: 'Đau nhất là lặng im',
    },
    {
      fullName: 'Beauty and a beat',
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
      <Helmet title="Quản lý bài hát" />
      <Card title="Quản lý bài hát">
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
          type={Constants.SONG_TYPE}
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

export default SongManage
