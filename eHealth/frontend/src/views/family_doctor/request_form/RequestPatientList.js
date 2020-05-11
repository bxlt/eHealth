import React from 'react'
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners'

import PatientSearch from '../../../components/clinician/existing/PatientSearch'
import PatientCard from '../../../components/family_doctor/PatientCard'
import PageTitle from '../../../components/common/PageTitle'
import { getFamilyDoctorPatients, setPatient, searchFamilyDoctorPatients } from '../../../redux/actions/family_doctors'

class RequestPatientList extends React.Component {
    componentDidMount(){
        this.props.getFamilyDoctorPatients()
    }


  renderPatients = () => {
    if (this.props.patients === null) return null
    return this.props.patients.map(patient => {
      return (
        <PatientCard
          key={patient.id}
          patient={patient}
        ></PatientCard>
      )
    })
  }
 
  filterList = (query) => {
      this.props.searchFamilyDoctorPatients(query)
  }

  render() {
    return (
      <div className="patient-listing-screen">
        <PageTitle title="Select Patient" />
        <PatientSearch filterList={this.filterList} />
        <div className="patient-listing-header">Patient Search Results</div>
        {this.props.patients === null ? (
          <ClipLoader sizeUnit={'px'} size={150} color={'#123abc'} loading />
        ) : (
          this.renderPatients()
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  patients: state.familyDoctor.patients
})

const mapDispatchToProps = {
  getFamilyDoctorPatients,
  setPatient,
  searchFamilyDoctorPatients
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestPatientList)
