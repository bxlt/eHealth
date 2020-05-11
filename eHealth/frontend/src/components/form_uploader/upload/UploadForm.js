import React from 'react'

const UploadForm = () => {
  return (
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
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
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
  )
}

export default UploadForm
