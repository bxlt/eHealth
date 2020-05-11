import React from 'react'
import PropTypes from 'prop-types'

const SuccessfulUploadPlaceholder = props => {
  return (
    <div className="center-content successful-upload--wrapper" style={{}}>
      <h2>Success!</h2>
      <svg
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="50px"
        height="50px"
        style={{
          marginTop: '1.25rem',
          marginBottom: '1.25rem'
        }}
      >
        <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 34.988281 14.988281 A 1.0001 1.0001 0 0 0 34.171875 15.439453 L 23.970703 30.476562 L 16.679688 23.710938 A 1.0001 1.0001 0 1 0 15.320312 25.177734 L 24.316406 33.525391 L 35.828125 16.560547 A 1.0001 1.0001 0 0 0 34.988281 14.988281 z" />
      </svg>
      <p>Successfully uploaded your XML DTD called {`${props.filename}`}</p>
    </div>
  )
}

SuccessfulUploadPlaceholder.propTypes = {
  filename: PropTypes.string
}

export default SuccessfulUploadPlaceholder
