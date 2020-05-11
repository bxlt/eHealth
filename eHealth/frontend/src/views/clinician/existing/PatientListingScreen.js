import React from 'react'
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners'

import PatientSearch from '../../../components/clinician/existing/PatientSearch'
import PatientCard from '../../../components/clinician/existing/PatientCard'
import PageTitle from '../../../components/common/PageTitle'
import PatientEmptyCard from '../../../components/clinician/existing/PatientEmptyCard'
import Fuse from 'fuse.js'
import { getFilledForms } from '../../../redux/actions/clinicians'

class PatientListingScreen extends React.Component {
  state = {
    filledFormsCopy: null
  }

  componentDidMount() {
    this.props.getFilledForms()
    if (this.props.filledForms.length > 0) {
      this.setState({
        filledFormsCopy: this.props.filledForms
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.filledFormsCopy === null &&
      this.props.filledForms.length > 0
    ) {
      this.setState({
        filledFormsCopy: this.props.filledForms
      })
    }
  }

  renderPatients = () => {
    if (this.state.filledFormsCopy === null) return null
    if (
      this.state.filledFormsCopy.length === 0 &&
      this.props.filledForms.length === 0
    ) {
      return <PatientEmptyCard />
    }
    if (
      this.state.filledFormsCopy.length === 0 &&
      this.props.filledForms.length > 0
    ) {
      return <PatientEmptyCard searched />
    }
    return this.state.filledFormsCopy.map(filled_form => {
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
        filledFormsCopy: this.props.filledForms
      }))
      return
    }

    if (this.state.filledFormsCopy) {
      const options = {
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['patient.first_name', 'patient.last_name', 'patient.ohip_number']
      }
      const fuse = new Fuse(this.props.filledForms, options)
      const result = fuse.search(value)
      this.setState(prevState => ({
        ...prevState,
        filledFormsCopy: result
      }))
    }
  }

  render() {
    return (
      <div data-testid="patientListingScreen" className="patient-listing-screen">
        <PageTitle title="Pending Forms for Transcription" />
        <PatientSearch filterList={this.filterList} />
        <div data-testid="patientListingHeader" className="patient-listing-header">Patient Search Results</div>
        {this.state.filledFormsCopy === null ? (
          <ClipLoader sizeUnit={'px'} size={150} color={'#123abc'} loading />
        ) : (
          this.renderPatients()
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filledForms: state.clinician.filledForms
})

const mapDispatchToProps = {
  getFilledForms
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientListingScreen)
