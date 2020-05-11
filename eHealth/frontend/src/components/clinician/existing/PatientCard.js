import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import PatientCardSvgDiagnosis from './svgs/PatientCardSvgDiagnosis'
import PatientCardSvgOhip from './svgs/PatientCardSvgOhip'
import PatientCardSvgFamilyDoctor from './svgs/PatientCardSvgFamilyDoctor'
import {
  setPatient,
  setFormIds,
  setFilledForm,
  fetchFilledFormAnswers
} from '../../../redux/actions/clinicians'

const PatientCard = props => {
  const { patient, unfilledForm, filledForm } = props
  const { family_doctor } = patient
  const history = useHistory()

  const handleClick = async () => {
    props.setPatient(patient)
    props.setFilledForm(filledForm)
    props.setFormIds(filledForm.id, unfilledForm.id)
    await props.fetchFilledFormAnswers()
    // Check if PatientCard is on clinician or family_doctor page
    let user
    if (history.location.pathname.includes("clinician")) {
      user = "clinician"
    } else if (history.location.pathname.includes("family_doctor")) {
      user = "family_doctor"
    }
    if(filledForm.status === "complete"){
      history.push(`/${user}/completed_form`)
    }else{
      history.push(`/${user}/filled_form`)
    }
  }

  return (
    <div className="patient-card" onClick={() => handleClick()}>
      <div className="patient-card-title">
        {`${patient.first_name} ${patient.last_name}`}
      </div>
      <div className="patient-card-attributes-wrapper">
        { props.unfilledForm ? 
        <div className="patient-card-attribute">
          <PatientCardSvgDiagnosis />
          <div className="patient-card-attributes-text">
            {`${unfilledForm.name} - Version: ${unfilledForm.version} `}
          </div>
        </div>
        : null }
        <div className="patient-card-attribute">
          <PatientCardSvgOhip />
          <div className="patient-card-attributes-text">
            {patient.ohip_number}
          </div>
        </div>
        { family_doctor ?  
        <div className="patient-card-attribute">
          <PatientCardSvgFamilyDoctor />
          <div className="patient-card-attributes-text">
            {`${family_doctor.first_name} ${family_doctor.last_name}`}
          </div>
        </div>
        : null }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  setPatient,
  setFormIds,
  fetchFilledFormAnswers,
  setFilledForm
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientCard)
