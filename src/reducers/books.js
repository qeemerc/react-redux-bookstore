import * as actionTypes from '../actionTypes'

const initialState = {
  items: null,
  isLoaded: false
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.LOAD_BOOKS:
      return {
        ...state,
        items: payload,
        isLoaded: true
      }
    default:
      return state
  }
}
