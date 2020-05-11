import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setForm } from '../../redux/actions/family_doctors'

const FormCard = props => {
  const { form } = props
  const history = useHistory()

  const handleClick = async () => {
    props.setForm(form)
    history.push('/family_doctor/patients/forms/clinicians')
    }

  return (
    <div>
      <div className="form-card" onClick={() => handleClick()}>
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
const mapStateToProps = state => ({})
const mapDispatchToProps = {
  setForm
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCard)
