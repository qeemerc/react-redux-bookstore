import * as actionTypes from '../actionTypes'

const initialState = {
  items: null,
  isLoaded: false,
  activeFilter: null,
  searchValue: ""
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: payload,
        isLoaded: true
      }
    case actionTypes.LOAD_CATEGORIES_FAILURE:
        return {
          ...state,
          isLoaded: false,
          error: payload
        }
    case actionTypes.SET_FILTER:
      return {
        ...state,
        activeFilter: payload
      }
    case actionTypes.CLEAR_FILTER:
      return {
        ...state,
        activeFilter: null,
        searchValue: ""
      }
    case actionTypes.SEARCH_BOOK:
      return {
        ...state,
        searchValue: payload
      }
    default:
      return state
  }
}
