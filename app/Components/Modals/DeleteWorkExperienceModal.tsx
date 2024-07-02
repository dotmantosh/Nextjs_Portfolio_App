'use client'
import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import { DeleteIcon } from '../SVGs/SVGIcons'

interface DeleteModalProps {
  handleDeleteWorkExperience: () => void
  isModalOpen: boolean
  isDeletingWorkExperience: boolean
  toggle: () => void
  closeBtn: React.ReactElement<HTMLButtonElement>;
}
const DeleteWorkExperienceModal = ({ handleDeleteWorkExperience, isDeletingWorkExperience, isModalOpen, toggle, closeBtn }: DeleteModalProps) => {

  return (
    <Modal
      contentClassName={'app_modal_content'}
      className={'app_modal'}
      centered isOpen={isModalOpen}
      size='md'
      toggle={toggle}
    >
      <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Delete WorkExperience</ModalHeader>
      <ModalBody>
        <div className='d-flex justify-content-center'>
          <DeleteIcon />
        </div>
        <p className='text-center'>Are you sure you want to DELETE this WorkExperience? </p>

      </ModalBody>
      <ModalFooter className={'app_modal_footer'}>
        <button className='app_modal_cancel' onClick={toggle}>
          Cancel
        </button>{' '}
        <button onClick={handleDeleteWorkExperience} className='app_modal_save'>
          {
            isDeletingWorkExperience ? <Spinner>Loading...</Spinner>
              :
              "Delete"
          }

        </button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteWorkExperienceModal