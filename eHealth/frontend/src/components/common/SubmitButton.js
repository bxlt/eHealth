import React from 'react'

const SubmitButton = props => {
  return (
    <button
      type="button"
      className="uff-submitButton"
      data-testid="formSubmitButtom"
      onClick={props.onClick}
    >
      Submit
    </button>
  )
}

export default SubmitButton
