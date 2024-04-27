'use client'
import React, { useState } from 'react'
import styles from '../Styles/_techstack.module.scss'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import Image from 'next/image'
import HtmlIcon from '../../public/imgs/icons/vscode-icons_file-type-html.png'
import { InputSearchIcon } from './SVGs/SVGIcons'

function TechStack() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const toggle = () => setIsModalOpen(!isModalOpen)
  const closeBtn = (
    <button className="app_modal_close" onClick={toggle} type="button">
      &times;
    </button>
  );

  return (
    <section className={styles.techStack}>
      <button className={styles.addModalbutton} color="danger" onClick={toggle}>
        + Add Skills
      </button>

      <Modal
        contentClassName={'app_modal_content'}
        className={'app_modal'}
        centered isOpen={isModalOpen}
        size='md'
        toggle={toggle}>
        <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Add Skills</ModalHeader>
        <ModalBody className={'app_modal_body'}>
          <div className={`position-relative ${styles.form_group} `}>
            <span className={styles.filterInput}><InputSearchIcon /></span>
            <input style={{ paddingLeft: "50px" }} type="text" placeholder='Filter skills' />
          </div>
          <div className={styles.skills_wrapper}>
            <div className={styles.skills_item}>
              <input type="checkbox" />
              <p className='mb-0'>Javascript</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className={'app_modal_footer'}>
          <button className='app_modal_cancel' onClick={toggle}>
            Cancel
          </button>{' '}
          <button className='app_modal_save' onClick={toggle}>
            Save
          </button>
        </ModalFooter>
      </Modal>

      <h3 className={`app-heading`}>My Tech Stack</h3>
      <p className='app-subheading'>Technologies I've been working with recently</p>

      <div className={styles.stackContainer}>
        <Row>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" fill alt="" className='html' />
              {/* <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" width="48"
                alt="Javascript" /> */}
              {/* <Image src={HtmlIcon} alt="" className='html'/> */}
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
          <Col md={2}>
            <div className={styles.stackIconWrapper}>
              <Image src={HtmlIcon} alt="" className='html' />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default TechStack
