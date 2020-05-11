import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const MenuCard = props => {
  return (
    <div data-testid="MenuCard" className="menu-card" onClick={() => props.history.push(props.route)}>
      <div className="menu-card-header-wrapper">
        <h3> {props.title} </h3>
      </div>
      <div className="menu-card-icon">{props.svg()}</div>
    </div>
  )
}

MenuCard.propTypes = {
  route: PropTypes.string,
  title: PropTypes.string,
  svg: PropTypes.func
}

export default withRouter(MenuCard)
