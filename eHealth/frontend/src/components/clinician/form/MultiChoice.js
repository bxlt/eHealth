import React from 'react'
import { questionsToQuestionItems } from './helpers.js'
import { connect } from 'react-redux'
import {
  setAnswersStore,
  submitAnswers
} from '../../../redux/actions/clinicians'

function MultiChoice({
  id,
  answer,
  setAnswer,
  question,
  options,
  disabled,
  dependentQuestionsMap,
  allAnswers,
  setAnswersStore,
  submitAnswers,
  prefilledAnswers
}) {
  const setAnswerCreator = id => {
    return v => {
      setAnswersStore({ [id]: v })
    }
  }

  const isChecked = option => {
    return prefilledAnswers && prefilledAnswers[id] && prefilledAnswers[id].includes(option)
  }

  let dependentQuestions = dependentQuestionsMap[id] || []
  const optionItems = options.map((option, i) => (
    <React.Fragment key={i}>
      <div className="mc-answer-wrapper">
        <input
          className="mc-answer-checkbox"
          data-testid="choiceEach"
          type="checkbox"
          disabled={disabled}
          defaultChecked={isChecked(option)}
          onChange={event => {
            let newAnswer
            if (event.target.checked) {
              newAnswer = answer.concat([option])
            } else {
              newAnswer = answer.filter(val => val !== option)
            }
            setAnswer(newAnswer)
            submitAnswers()
          }}
        />
        <label data-testid="optionLabel">{option}</label>
      </div>
      {questionsToQuestionItems(
        dependentQuestions
          .filter(question => question.parent_value === option)
          .map(question => {
            if (question.question_body === option) {
              return { ...question, question_body: '' }
            } else {
              return question
            }
          }),
        allAnswers,
        setAnswerCreator,
        dependentQuestionsMap
      )}
    </React.Fragment>
  ))

  return (
    <div
      className={'question-wrapper ' + (disabled ? 'disabled' : '')}
      data-testid="multiChoiceForm"
    >
      {question !== '' && (
        <label data-testid="questionLabel" htmlFor={question}>
          {question}
        </label>
      )}
      <div className="mc-answer-container">{optionItems}</div>
    </div>
  )
}

const mapStateToProps = state => ({
  allAnswers: state.clinician.answers,
  prefilledAnswers: state.clinician.prefilledAnswers
})

const mapDispatchToProps = {
  setAnswersStore,
  submitAnswers
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiChoice)
// export default MultiChoice
