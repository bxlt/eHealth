import React from 'react'
import { connect } from 'react-redux'
import { submitAnswers } from '../../../redux/actions/clinicians'

function TextField({
  id,
  answer,
  setAnswer,
  question,
  disabled,
  submitAnswers,
  prefilledAnswers
}) {
  const answerValue = () => {
    if (answer === '') {
      return prefilledAnswers[id]
    }
    return answer
  }

  return (
    <div
      className={'question-wrapper ' + (disabled ? 'disabled' : '')}
      data-testid="textFieldForm"
    >
      <label data-testid="questionLabel" htmlFor={question}>
        {question}
      </label>
      <input
        className="tf-answer-wrapper"
        data-testid="answerField"
        type="text"
        value={answerValue() || ""}
        onChange={event => {
          setAnswer(event.target.value)
          submitAnswers()
        }}
        disabled={disabled}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  prefilledAnswers: state.clinician.prefilledAnswers
})

const mapDispatchToProps = {
  submitAnswers
}

export default connect(mapStateToProps, mapDispatchToProps)(TextField)
// export default TextField
