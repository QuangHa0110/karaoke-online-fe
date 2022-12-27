import React from 'react'
import { Modal } from 'antd'

const DeletePopup = ({ title, isModalOpen, handleOk, handleCancel }) => {
  return (
    <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Bạn có chắc chắn muốn xóa không?</p>
    </Modal>
  )
}

export default DeletePopup
