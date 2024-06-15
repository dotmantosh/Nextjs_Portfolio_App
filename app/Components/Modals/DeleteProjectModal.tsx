import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import { DeleteIcon } from '../SVGs/SVGIcons'

interface DeleteModalProps {
  handleDeleteProject: () => void
  isModalOpen: boolean
  isDeletingProject: boolean
  toggle: () => void
  closeBtn: React.ReactElement<HTMLButtonElement>;
}
const DeleteProjectModal = ({ handleDeleteProject, isModalOpen, isDeletingProject, toggle, closeBtn }: DeleteModalProps) => {

  return (
    <Modal
      contentClassName={'app_modal_content'}
      className={'app_modal'}
      centered isOpen={isModalOpen}
      size='md'
      toggle={toggle}
    >
      <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Delete Project</ModalHeader>
      <ModalBody>
        <div className='d-flex justify-content-center'>
          <DeleteIcon />
        </div>
        <p className='text-center'>Are you sure you want to DELETE this Project? </p>


      </ModalBody>

      <ModalFooter className={'app_modal_footer'}>
        <button className='app_modal_cancel' onClick={toggle}>
          Cancel
        </button>{' '}
        <button onClick={handleDeleteProject} type='submit' className='app_modal_save'>
          {isDeletingProject ? <Spinner>Loading...</Spinner> : "Delete"}
          Delete
        </button>
      </ModalFooter>

    </Modal>
  )
}

export default DeleteProjectModal