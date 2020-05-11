import React from 'react'
import UploadFormSvg from '../main_screen/UploadFormSvg'

const DragActive = params => {
  return (
    <div>
      <h3 className="drag-active">Click or Drag and Drop to Upload!</h3>
      <UploadFormSvg />
    </div>
  )
}

export default DragActive
