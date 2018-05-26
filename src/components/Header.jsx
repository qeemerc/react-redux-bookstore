import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { getCartValue } from '../selectors/cart'


class Header extends Component {
  render(){
    return (
      <Container>
        <NavLink exact to="/">Главная</NavLink>
        <NavLink to="/cart">Корзина ({this.props.cartValue})</NavLink>
        <NavLink to="/favorites">Избранное</NavLink>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  cartValue: getCartValue(state)
})

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(Header)
