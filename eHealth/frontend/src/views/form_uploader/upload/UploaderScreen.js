import React, { useState } from 'react'
import PageTitle from '../../../components/common/PageTitle'
import Dropzone from 'react-dropzone'
import DragActive from '../../../components/form_uploader/upload/DragActive'
import DragReject from '../../../components/form_uploader/upload/DragReject'
import { APP_SERVER } from '../../../constants/constants'
import SubmitButton from '../../../components/common/SubmitButton'
import { useAlert } from 'react-alert'
import SuccessfulUploadPlaceholder from '../../../components/form_uploader/upload/SuccessfulUploadPlaceholder'

const UploaderScreen = () => {
  const [acceptedFile, setAcceptedFile] = useState(null)
  const [showUploadForm, setShowUploadForm] = useState(true)
  const alert = useAlert()

  const appendAcceptedFile = acceptedFiles => {
    if (acceptedFiles.length === 1) {
      setAcceptedFile(acceptedFiles[0])
    }
  }

  const handleSubmit = async e => {
    console.log("over here")
    e.preventDefault()
    let formData = new FormData()

    if (acceptedFile === null) {
      return alert.error(
        'Sorry! You must upload an XML file before submitting.'
      )
    }

    formData.append('template[uploaded_template]', acceptedFile)
    formData.append(
      'template[name]',
      document.getElementById('upload-name').value
    )
    formData.append(
      'template[dtd_type]',
      document.getElementById('upload-dtd_type').value
    )
    formData.append(
      'template[version]',
      document.getElementById('upload-version').value
    )

    try {
      const response = await fetch(
        `${APP_SERVER}/api/v1/form_manager/templates`,
        {
          method: 'POST',
          body: formData
        }
      )
      const json = await response.json()
      if (response.ok) {
        setShowUploadForm(false)
      } else {
        alert.error('Please review the following errors: ')
        // Clear existing errors
        document.querySelectorAll("div[id*='-error']").forEach(elm => {
          elm.innerText = ''
        })
        // Show current errors
        Object.keys(json).forEach(key => {
          document.getElementById(`upload-${key}-error`).innerText =
            json[key][0]
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="center-content">
      <PageTitle title="Upload an XML DTD" />
      {showUploadForm ? (
        <form>
          <div className="uploader--form-wrapper">
            <div className="uploader--input-wrapper">
              <label>Name</label>
              <input
                id="upload-name"
                type="text"
                placeholder="Form Name"
                required
              ></input>
              <div id="upload-name-error"></div>
            </div>

            <div className="uploader--input-wrapper">
              <label>DTD Type</label>
              <input
                id="upload-dtd_type"
                type="text"
                placeholder="DTD Type (e.g. Type 3)"
                required
              ></input>
              <div id="upload-dtd_type-error"></div>
            </div>

            <div className="uploader--input-wrapper">
              <label>Version</label>
              <input
                id="upload-version"
                type="text"
                placeholder="Version Number (e.g. Type A)"
                required
              ></input>
              <div id="upload-version-error"></div>
            </div>
          </div>
          {acceptedFile === null ? (
            <Dropzone
              accept="text/xml"
              multiple={false}
              onDrop={appendAcceptedFile}
            >
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject
              }) => (
                <section>
                  <div className="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!isDragActive && <DragActive />}
                    {isDragActive && !isDragReject && <DragActive />}
                    {isDragReject && <DragReject />}
                  </div>
                </section>
              )}
            </Dropzone>
          ) : (
            <div>File for uploading: {`${acceptedFile.name}`}</div>
          )}

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <SubmitButton onClick={handleSubmit} />
          </div>
        </form>
      ) : (
        <SuccessfulUploadPlaceholder filename={acceptedFile.name} />
      )}
    </div>
  )
}

export default UploaderScreen
