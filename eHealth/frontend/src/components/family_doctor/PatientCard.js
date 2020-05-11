import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import PatientCardSvgOhip from '../../components/clinician/existing/svgs/PatientCardSvgOhip'
import PatientCardSvgFamilyDoctor from '../../components/clinician/existing/svgs/PatientCardSvgFamilyDoctor'
import {
  setPatient,
} from '../../redux/actions/family_doctors'

const PatientCard = props => {
  const { patient } = props
  const { family_doctor } = patient
  const history = useHistory()

  const handleClick = async () => {
    props.setPatient(patient)
    history.push('/family_doctor/patients/forms')
  }


  return (
    <div className="patient-card" onClick={() => handleClick()}>
      <div className="patient-card-title">
        {`${patient.first_name} ${patient.last_name}`}
      </div>
      <div className="patient-card-attributes-wrapper">
        <div className="patient-card-attribute">
          <PatientCardSvgOhip />
          <div className="patient-card-attributes-text">
            {patient.ohip_number}
          </div>
          {family_doctor ?
            <div className="patient-card-attribute">
              <PatientCardSvgFamilyDoctor />
              <div className="patient-card-attributes-text">
                {`${family_doctor.first_name} ${family_doctor.last_name}`}
              </div>
            </div>
            : null}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  setPatient
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientCard)
