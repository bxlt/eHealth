import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const InfoCard = props => {
  return (
    <div className="menu-card" onClick={() => props.history.push(props.route)}>
      <div className="menu-card-header-wrapper">
        <h3> {props.title} </h3>
      </div>
      <div className="menu-card-text">
        <h2> {props.info} </h2>
      </div>
      <div className="menu-card-icon">{props.svg()}</div>
    </div>
  )
}

InfoCard.propTypes = {
  title: PropTypes.string,
  svg: PropTypes.func,
  info: PropTypes.string

}

export default withRouter(InfoCard)
