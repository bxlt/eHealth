import React from 'react'
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners'

import PatientSearch from '../../components/clinician/existing/PatientSearch'
import PatientCard from '../../components/clinician/existing/PatientCard'
import PageTitle from '../../components/common/PageTitle'
import PatientEmptyCard from '../../components/clinician/existing/PatientEmptyCard'
import Fuse from 'fuse.js'
import { getCompletedForms } from '../../redux/actions/clinicians'

class PatientListingScreen extends React.Component {
  state = {
    completedFormsCopy: null
  }

  componentDidMount() {
    this.props.getCompletedForms()
    if (this.props.completedForms.length > 0) {
      this.setState({
        completedFormsCopy: this.props.completedForms
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.completedFormsCopy === null &&
      this.props.completedForms.length > 0
    ) {
      this.setState({
        completedFormsCopy: this.props.completedForms
      })
    }
  }

  renderPatients = () => {
    if (this.state.completedFormsCopy === null) return null
    if (
      this.state.completedFormsCopy.length === 0 &&
      this.props.completedForms.length === 0
    ) {
      return <PatientEmptyCard />
    }
    if (
      this.state.completedFormsCopy.length === 0 &&
      this.props.completedForms.length > 0
    ) {
      return <PatientEmptyCard searched />
    }
    return this.state.completedFormsCopy.map(filled_form => {
      return (
        <PatientCard
          key={`${filled_form.patient.ohip_number} ${filled_form.id}`}
          patient={filled_form.patient}
          filledForm={filled_form}
          unfilledForm={filled_form.unfilled_form}
        ></PatientCard>
      )
    })
  }

  filterList = query => {
    const value = query.target.value

    if (value === '') {
      this.setState(prevState => ({
        ...prevState,
        completedFormsCopy: this.props.completedForms
      }))
      return
    }

    if (this.state.completedFormsCopy) {
      const options = {
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['patient.first_name', 'patient.last_name', 'patient.ohip_number']
      }
      const fuse = new Fuse(this.props.completedForms, options)
      const result = fuse.search(value)
      this.setState(prevState => ({
        ...prevState,
        completedFormsCopy: result
      }))
    }
  }

  render() {
    return (
      <div data-testid="patientListingScreen" className="patient-listing-screen">
        <PageTitle title="Completed Forms" />
        <PatientSearch filterList={this.filterList} />
        <div data-testid="patientListingHeader" className="patient-listing-header">Patient Search Results</div>
        {this.state.completedFormsCopy === null ? (
          <ClipLoader sizeUnit={'px'} size={150} color={'#123abc'} loading />
        ) : (
          this.renderPatients()
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  completedForms: state.clinician.completedForms
})

const mapDispatchToProps = {
  getCompletedForms
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientListingScreen)
