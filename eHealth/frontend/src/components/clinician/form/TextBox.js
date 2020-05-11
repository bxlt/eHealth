import React from 'react'

function TextBox({ answer, setAnswer, question }) {
  return (
    <div className="question-wrapper" data-testid="testBoxForm">
      <label data-testid="questionLabel" htmlFor={question}>
        {question}
      </label>
      <textarea
        className="tb-answer-wrapper"
        data-testid="answerField"
        type="text"
        value={answer}
        onChange={event => setAnswer(event.target.value)}
      />
    </div>
  )
}

export default TextBox
