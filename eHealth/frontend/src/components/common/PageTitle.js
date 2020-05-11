import React from 'react'
import PropTypes from 'prop-types'

const PageTitle = props => {
  return (
    <div className="page-title">
      {props.optionalTitle ? (
        <div>
          <div className="page-title-optional-main">{props.title}</div>
          <div className="page-title-optional-title">{props.optionalTitle}</div>
        </div>
      ) : (
        <div className="page-title-main">{props.title}</div>
      )}
    </div>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string,
  optionalTitle: PropTypes.string
}

export default PageTitle
