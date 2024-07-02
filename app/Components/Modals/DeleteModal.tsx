'use client'
import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import { DeleteIcon } from '../SVGs/SVGIcons'

interface DeleteModalProps {
  handleDelete: () => void
  isModalOpen: boolean
  isDeleting: boolean
  toggle: () => void
  name?: string
  closeBtn: React.ReactElement<HTMLButtonElement>;
}
const DeleteModal = ({ handleDelete, isDeleting, name, isModalOpen, toggle, closeBtn }: DeleteModalProps) => {

  return (
    <Modal
      contentClassName={'app_modal_content'}
      className={'app_modal'}
      centered isOpen={isModalOpen}
      size='md'
      toggle={toggle}
    >
      <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Delete {name ? name : "resource"}</ModalHeader>
      <ModalBody>
        <div className='d-flex justify-content-center'>
          <DeleteIcon />
        </div>
        <p className='text-center'>Are you sure you want to DELETE {name ? name : "this resourse"}? </p>

      </ModalBody>
      <ModalFooter className={'app_modal_footer'}>
        <button className='app_modal_cancel' onClick={toggle}>
          Cancel
        </button>{' '}
        <button onClick={handleDelete} className='app_modal_save'>
          {
            isDeleting ? <Spinner>Loading...</Spinner>
              :
              "Delete"
          }

        </button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteModal