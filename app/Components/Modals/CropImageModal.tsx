'use client'
import React, { SetStateAction, useCallback, useRef, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import ReactCrop, { PixelCrop, PercentCrop, centerCrop, makeAspectCrop, type Crop, convertToPixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import styles from '../../Styles/_profile.module.scss'
import setCanvasPreview from '@/app/helpers/setCanvasPreview';

interface CropImageModalProps {
  handleUploadProfilePicture: (croppedPhoto: string) => void
  isModalOpen: boolean
  isLoading: boolean
  toggle: () => void
  src: string
  onCropComplete: (base64: string) => void
  closeBtn: React.ReactElement<HTMLButtonElement>;
}

const MIN_DIMENSION = 180
const ASPECT_RATIO = 1
const CropImageModal = ({ handleUploadProfilePicture, isLoading, isModalOpen, toggle, closeBtn, src, onCropComplete }: CropImageModalProps) => {

  const [crop, setCrop] = useState<PercentCrop>()
  const [error, setError] = useState<string>()
  // const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100

    const crop = makeAspectCrop({
      unit: '%',
      width: cropWidthInPercent
    },
      ASPECT_RATIO,
      width,
      height
    )
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop)
  }, [])

  const cropImage = useCallback(() => {
    setError(undefined)
    if (imageRef.current && canvasRef.current && crop) {
      const pixelCrop = convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height)
      setCanvasPreview(
        imageRef.current,
        canvasRef.current,
        pixelCrop
      )
      onCropComplete(canvasRef.current.toDataURL() as string)
    } else {
      setError("Error cropping the image. Please try again.")
    }
  }, [crop])
  return (
    <Modal
      contentClassName={'app_modal_content'}
      className={'app_modal'}
      centered isOpen={isModalOpen}
      size='lg'
      toggle={toggle}
    >
      <ModalHeader className={'app_modal_header'} close={closeBtn} toggle={toggle}>Crop Image</ModalHeader>
      <ModalBody>

        <div className='d-flex gap-30'>
          <ReactCrop
            crop={crop}
            aspect={ASPECT_RATIO}
            keepSelection
            minWidth={MIN_DIMENSION}
            onChange={(pixelCrop, percentageCrop) => { setCrop(percentageCrop) }}
          >
            <img
              ref={imageRef}
              src={src}
              alt='image'
              onLoad={onImageLoad}
              style={{ maxHeight: "70vh" }}
            />
          </ReactCrop>
          <div>
            <canvas

              style={{
                border: "1px solid #fff",
                objectFit: "contain",
                width: MIN_DIMENSION,
                height: MIN_DIMENSION
              }}
              ref={canvasRef}
            />
            <div className='d-flex justify-content-center mt-3' >
              <button className={styles.cropImageBtn} onClick={cropImage}>
                Crop Image
              </button>
            </div>
            {error && <small className='form-error-feedback mt-2'>{error}</small>}
          </div>
        </div>




      </ModalBody>
      <ModalFooter className={'app_modal_footer'}>
        <button className='app_modal_cancel' onClick={toggle}>
          Cancel
        </button>{' '}
        <button onClick={() => { handleUploadProfilePicture(canvasRef.current?.toDataURL() as string) }} className='app_modal_save'>
          {
            isLoading ? <Spinner>Loading...</Spinner>
              :
              "Upload"
          }

        </button>
      </ModalFooter>
    </Modal>
  )
}

export default CropImageModal