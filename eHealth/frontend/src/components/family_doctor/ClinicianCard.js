import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { setClinician } from '../../redux/actions/family_doctors'

const ClinicianCard = props => {
  const { clinician } = props
  const history = useHistory()

  const handleClick = async () => {
    props.setClinician(clinician)
    history.push('/family_doctor/patients/forms/clinicians/confirm')
  }

  return (
    <div className="patient-card" onClick={() => handleClick()}>
      <div className="patient-card-title">
        {`${clinician.first_name} ${clinician.last_name}`}
      </div>
      <div
        className="patient-card-attributes-text"
        style={{ textAlign: 'left', marginLeft: '0' }}
      >
        CSPO: {clinician.cpso_number}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  setClinician
}

export default connect(mapStateToProps, mapDispatchToProps)(ClinicianCard)
