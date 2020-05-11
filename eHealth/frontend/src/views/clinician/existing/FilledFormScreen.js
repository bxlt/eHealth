import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import SectionCard from '../../../components/clinician/existing/SectionCard'
import SubmitButton from '../../../components/common/SubmitButton'

import {
  fetchUnfilledForm,
  fetchFilledFormAnswers,
  fetchQuestions,
  submitAnswers,
  submitForm
} from '../../../redux/actions/clinicians'

const FilledFormScreen = props => {
  const history = useHistory()
  const handleClick = async () => {
    props.submitForm()
    history.goBack();
  }
  useEffect(() => {
    props.fetchUnfilledForm()
    props.fetchFilledFormAnswers()
  }, [])
  return (
    <div className="container unfilled-form-screen">
      {props.sections &&
        props.sections.map(values => (
          <SectionCard
            key={values.id}
            id={values.id}
            values={values}
            level={0}
          />
        ))}
      <SubmitButton onClick={handleClick} />
    </div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(FilledFormScreen)
