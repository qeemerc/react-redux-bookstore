import * as actionTypes from '../actionTypes'

const initialState = {
  book: null,
  bookHistory: []
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.FETCH_BOOK_BY_ID:
      return {
        bookHistory: [...state.bookHistory, payload],
        book: payload
      }
    default:
      return state
  }
}
