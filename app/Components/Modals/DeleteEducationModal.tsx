import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import { DeleteIcon } from '../SVGs/SVGIcons'

interface DeleteModalProps {
  handleDeleteEducation: () => void
  isModalOpen: boolean
  isDeletingEducation: boolean
  toggle: () => void
  closeBtn: React.ReactElement<HTMLButtonElement>;
}
const DeleteEducationModal = ({ handleDeleteEducation, isModalOpen, toggle, closeBtn, isDeletingEducation }: DeleteModalProps) => {

  return (
    <Modal
      contentClassName={'app_modal_content'}
      className={'app_modal'}
      centered isOpen={isModalOpen}
      size='md'
      toggle={toggle}
    >
      <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Delete Education</ModalHeader>
      <ModalBody>
        <div className='d-flex justify-content-center'>
          <DeleteIcon />
        </div>
        <p className='text-center'>Are you sure you want to DELETE this Education? </p>


      </ModalBody>

      <ModalFooter className={'app_modal_footer'}>
        <button className='app_modal_cancel' onClick={toggle}>
          Cancel
        </button>{' '}
        <button onClick={handleDeleteEducation} type='submit' className='app_modal_save'>
          {
            isDeletingEducation ?
              <Spinner>Loading...</Spinner>
              : "Delete"
          }

        </button>
      </ModalFooter>

    </Modal>
  )
}

export default DeleteEducationModal