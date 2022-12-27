/* eslint-disable no-unused-vars */
import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Constants from 'util/constants'
import AddPopup from '../popup-manage/add'
import DeletePopup from '../popup-manage/delete'
import EditPopup from '../popup-manage/edit'

const AccountManage = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 })
  const [data, setData] = useState([])
  const [dataEdit, setDataEdit] = useState(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const titleAdd = 'Thêm người dùng'
  const titleEdit = 'Chỉnh sửa thông tin người dùng'
  const titleDelete = 'Xóa người dùng'

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
  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      fullName: 'John Wick',
      email: 'johnwick@example.com',
    },
    {
      fullName: 'Captain America',
      email: 'captain@example.com',
    },
    {
      fullName: 'Vu Dinh Duy',
      email: 'duyvd@gmail.com',
    },
  ]

  useEffect(() => {
    setData(test)
  }, [test])

  return (
    <div>
      <Helmet title="Quản lý tài khoản" />
      <Card title="Quản lý tài khoản">
        <Row style={{ width: '100%' }} justify="space-between">
          <Col span={8}>
            <Input.Search placeholder="Nhập từ khóa tìm kiếm theo" />
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
          type={Constants.USER_TYPE}
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

export default AccountManage
