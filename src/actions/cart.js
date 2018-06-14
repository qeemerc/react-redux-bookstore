import * as actionTypes from "../actionTypes"

export const addBookToCart = (book) => dispatch => {
  const bookItem = {
    ...book,
    count: 1
  }

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: bookItem
  })
}


export const checkOut = (cartData) => dispatch => {
  alert(JSON.stringify(cartData))
  dispatch({
    type: actionTypes.CHECK_OUT,
    payload: cartData
  })
}

export const clearCart = () => dispatch => {
  dispatch({
    type: actionTypes.CLEAR_CART
  })
}

export const removeItem = (id) => dispatch => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id
  })
}
