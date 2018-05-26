import * as actionTypes from '../actionTypes'

const initialState = {
  books: []
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        books: [...state.books, payload]
      }
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        books: []
      }
    case actionTypes.CHECK_OUT:
      return {
        ...state,
        books: [],
        payData: payload
      }
    default:
      return state
  }
}
