import React from 'react'

const FormCard = props => {
  const { form } = props
  return (
    <div>
      <div className="form-card">
        <div className="form-card-title">{`${form.name}`}</div>
        <div className="form-card-attributes-wrapper">
          <div className="form-card-attribute">
            <div className="form-attributes-title">DTD Type:</div>
            <div className="form-card-attributes-text">{form.dtd_type}</div>
          </div>
          <div className="form-card-attribute">
            <div className="form-attributes-title">Form Version:</div>

            <div className="form-card-attributes-text">{form.version}</div>
          </div>
          <div className="form-card-attribute">
            <div className="form-attributes-title">Uploaded On:</div>
            <div className="form-card-attributes-text">
              {new Date(form.created_at).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormCard
