import * as actionTypes from '../actionTypes'

const initialState = {
  books: [],
  payData: null
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
      console.log(payload)
      return {
        books: [],
        payData: payload
      }
    default:
      return state
  }
}
