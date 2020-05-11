import React from 'react'
import { connect } from 'react-redux'

import SectionCard from '../../components/clinician/existing/SectionCard'

import {
  fetchUnfilledForm,
  fetchFilledFormAnswers,
  fetchQuestions,
  submitAnswers,
  submitForm
} from '../../redux/actions/clinicians'

class CompletedFormScreen extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchFilledFormAnswers()
  }

  async componentDidMount() {
    this.props.fetchUnfilledForm()
  }


  render() {
    return (
      <div className="container unfilled-form-screen">
        {this.props.sections &&
          this.props.sections.map(values => (
            <SectionCard
              key={values.id}
              id={values.id}
              values={values}
              level={0}
            />
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sections: state.clinician.sections,
})

const mapDispatchToProps = {
  fetchUnfilledForm,
  fetchFilledFormAnswers,
  fetchQuestions,
  submitAnswers,
  submitForm
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedFormScreen)
