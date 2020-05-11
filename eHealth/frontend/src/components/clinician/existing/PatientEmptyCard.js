import React from 'react'

const PatientEmptyCard = props => {
  return (
    <div className="patient-card" onClick={props.nextPage}>
      <div className="patient-card-title">
        {props.searched
          ? 'Your search did not return any results. Please try again.'
          : '  There are no patient forms to be filled out at this time.'}
      </div>
    </div>
  )
}

export default PatientEmptyCard
