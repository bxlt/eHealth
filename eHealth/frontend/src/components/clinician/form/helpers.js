import React from 'react'
import TextField from './TextField'
import MultiChoice from './MultiChoice'
// ------- Helper functions -------
export const questionsToQuestionItems = (
  questions,
  answers,
  setAnswerCreator,
  dependentQuestionsMap
) => {
  const questionItems = []
  let item
  for (let i = 0; i < questions.length; i++) {
    let {
      id,
      question_body,
      question_type,
      options,
      is_follow_up_flag,
      parent_id,
      parent_value
    } = questions[i]
    let disabled = false
    if (is_follow_up_flag === true) {
      if (
        answers[parent_id] === undefined ||
        !answers[parent_id].includes(parent_value)
      ) {
        disabled = true
      }
    }

    switch (question_type) {
      case 'TextField':
        item = (
          <TextField
            key={id}
            id={id}
            answer={answers[id]}
            setAnswer={setAnswerCreator(id)}
            question={question_body}
            disabled={disabled}
          />
        )
        break
      case 'MultiChoice':
        item = (
          <MultiChoice
            key={id}
            id={id}
            answer={answers[id]}
            setAnswer={setAnswerCreator(id)}
            question={question_body}
            options={options.map(option => option.value)}
            disabled={disabled}
            dependentQuestionsMap={dependentQuestionsMap}
          />
        )
        break
      default:
        console.log('Unexpected question type', question_type)
    }
    questionItems.push(item)
  }
  return questionItems
}

export function getDefaultAnswer(question_type) {
  switch (question_type) {
    case 'TextField':
    case 'TextBox':
    case 'TrueFalse':
    case 'Select':
      return ''
    case 'MultiChoice':
      return []
    default:
      console.log('Unexpected question_type:', question_type)
  }
}

// Source: https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
export const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})
