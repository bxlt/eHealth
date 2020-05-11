import React from 'react'
import PageTitle from '../../components/common/PageTitle'
import MenuCard from '../../components/common/MenuCard'
import UploadFormSvg from '../../components/form_uploader/main_screen/UploadFormSvg'
import UploadedFormsSvg from '../../components/form_uploader/main_screen/UploadedFormsSvg'

const FormUploaderMainScreen = () => {
  return (
    <div>
      <PageTitle title="Form Uploader" />
      <div className="card-container">
        <MenuCard
          title="Upload a Form"
          svg={UploadFormSvg}
          route="/form_uploader/upload"
        />
        <MenuCard
          title="View Uploaded Forms"
          svg={UploadedFormsSvg}
          route="/form_uploader/uploaded"
        />
      </div>
    </div>
  )
}

export default FormUploaderMainScreen
