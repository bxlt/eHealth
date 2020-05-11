import React from 'react'

function Select({ answer, setAnswer, question, options }) {
  const optionItems = options.map((option, i) => (
    <option data-testid="optionEach" key={i} value={option}>
      {option}
    </option>
  ))

  return (
    <div className="question-wrapper" data-testid="selectForm">
      <label data-testid="questionLabel" htmlFor={question}>
        {question}
      </label>
      <div className="sel-answer-wrapper">
        <select
          value={answer}
          onChange={event => setAnswer(event.target.value)}
        >
          <option data-testid="optionSelect" value={''}>
            Select an option
          </option>
          {optionItems}
        </select>
      </div>
    </div>
  )
}

export default Select
