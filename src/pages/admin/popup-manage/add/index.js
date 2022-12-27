import React from 'react'
import { Modal, Input } from 'antd'
import Constants from 'util/constants'

const AddPopup = ({ title, isModalOpen, handleOk, handleCancel, type }) => {
  return (
    <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {type === Constants.USER_TYPE && (
        <>
          <p className="mb-2">Họ và tên:</p>
          <Input className="mb-3" placeholder="Họ và tên" />
          <p className="mb-2">Email:</p>
          <Input placeholder="Email" />
        </>
      )}
      {type === Constants.SINGER_TYPE && (
        <>
          <p className="mb-2">Tên ca sĩ:</p>
          <Input className="mb-3" placeholder="Tên ca sĩ" />
        </>
      )}
      {type === Constants.SONG_TYPE && (
        <>
          <p className="mb-2">Tên bài hát:</p>
          <Input className="mb-3" placeholder="Tên bài hát" />
        </>
      )}
    </Modal>
  )
}

export default AddPopup
