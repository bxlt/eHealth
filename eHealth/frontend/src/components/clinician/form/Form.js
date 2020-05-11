import React, { useEffect } from 'react'
import {questionsToQuestionItems, getDefaultAnswer, groupBy} from './helpers.js'
import { connect } from 'react-redux'
import { setAnswersStore, submitAnswers } from '../../../redux/actions/clinicians'

// Expects array of question objects as prop
// according to question schema:
// id, question_body, question_type, options
function Form({ setAnswersStore, questions, answers, prefilledAnswers, status}) {
  useEffect(() => {
    if (Object.entries(prefilledAnswers).length === 0 && prefilledAnswers.constructor === Object) {
      const answers = Object.assign(
        {},
        ...questions.map(question => ({
          [question.id]: getDefaultAnswer(question.question_type)
        }))
      )
      setAnswersStore(answers)
    }
    else {
      setAnswersStore(prefilledAnswers)
    }
    submitAnswers()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setAnswerCreator = id => {
    return v => {
      setAnswersStore({ [id]: v })
    }
  }

  const groupByParentId = groupBy('parent_id')
  const dependentQuestionsMap = groupByParentId(questions.filter(question => question.is_follow_up_flag === true))
  const topLevelQuestions = questions.filter(question => question.is_follow_up_flag === false)
  if(status === "complete"){
    return (
      <div className="question-container">
        <div className="form-header"></div>
        <form data-testid="validForm"> 
          <fieldset disabled="disabled">
            {questionsToQuestionItems(topLevelQuestions, answers, setAnswerCreator, dependentQuestionsMap)}
          </fieldset>
        </form>
      </div>
    )
  }else{
    return (
      <div className="question-container">
        <div className="form-header"></div>
        <form data-testid="validForm"> 
          {questionsToQuestionItems(topLevelQuestions, answers, setAnswerCreator, dependentQuestionsMap)}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  answers: state.clinician.answers,
  status: state.clinician.filledForm.status
})

const mapDispatchToProps = {
  setAnswersStore,
  submitAnswers,
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
