import React from 'react'
import { Modal, Input } from 'antd'

const EditPopup = ({ title, isModalOpen, data, handleOk, handleCancel }) => {
  return (
    <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p className="mb-2">Họ và tên:</p>
      <Input className="mb-3" defaultValue={data.fullName} />
      {data.email && (
        <>
          <p className="mb-2">Email:</p>
          <Input className="mb-3" defaultValue={data.email} />
        </>
      )}
    </Modal>
  )
}

export default EditPopup
