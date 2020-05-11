import React, { useState, useEffect } from 'react'
import PageTitle from '../../../components/common/PageTitle'
import { ClipLoader } from 'react-spinners'
import FormCard from '../../../components/form_uploader/uploaded/FormCard'
import { APP_SERVER } from '../../../constants/constants'

const UploadedScreen = props => {
  const [uploadedForms, setUploadedForms] = useState(null)

  useEffect(() => {
    const fetchUploadedForms = async () => {
      const response = await fetch(
        `${APP_SERVER}/api/v1/form_manager/templates`
      )
      const json = await response.json()
      if (response.ok) {
        setUploadedForms(json.templates)
      }
    }
    fetchUploadedForms()
  }, [])

  const renderFormCards = () => {
    if (uploadedForms.length === 0) {
      return <div>There are no uploaded forms at this time.</div>
    }
    console.log(uploadedForms)
    return (
      <div>
        {uploadedForms.map(form => (
          <FormCard key={form.id} form={form} />
        ))}
      </div>
    )
  }
  return (
    <div className="center-content">
      <PageTitle title="Uploaded XML Forms" />

      {uploadedForms === null ? (
        <ClipLoader sizeUnit={'px'} size={150} color={'#123abc'} loading />
      ) : (
        renderFormCards()
      )}
    </div>
  )
}

export default UploadedScreen
