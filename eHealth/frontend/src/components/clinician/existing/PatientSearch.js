import React from 'react'

const PatientSearch = props => {
  return (
    <div data-testid="patientSearch">
      <input
        className="patient-search"
        placeholder="Search for an existing patient"
        onChange={props.filterList}
      />
    </div>
  )
}

export default PatientSearch
