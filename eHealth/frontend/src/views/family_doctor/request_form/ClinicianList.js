import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import PageTitle from '../../../components/common/PageTitle'
import { getClinicians } from '../../../redux/actions/family_doctors'
import ClinicianCard from '../../../components/family_doctor/ClinicianCard'
const ClinicianList = props => {
  useEffect(() => {
    props.getClinicians()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderClinicians = () => {
    if (props.clinicians === null) return null
    return props.clinicians.map(clinician => {
      return (
        <ClinicianCard key={clinician.id} clinician={clinician}></ClinicianCard>
      )
    })
  }

  return (
    <div className="patient-listing-screen">
      <PageTitle title="Assign to a Clinician" />
      <div className="patient-listing-header">Clinician Search Results</div>
      {props.clinicians === null ? (
        <ClipLoader sizeUnit={'px'} size={150} color={'#123abc'} loading />
      ) : (
        renderClinicians()
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  patient: state.familyDoctor.patient,
  unfilledForm: state.familyDoctor.unfilledForm,
  clinicians: state.familyDoctor.clinicians
})
const mapDispatchToProps = {
  getClinicians
}

export default connect(mapStateToProps, mapDispatchToProps)(ClinicianList)
