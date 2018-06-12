import * as actionTypes from '../actionTypes'

const initialState = {
  items: null,
  isLoading: false,
  isLoaded: false
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.LOAD_BOOKS_START:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOAD_BOOKS_SUCCESS:
      return {
        ...state,
        items: [...payload],
        isLoaded: true,
        isLoading: false
      }
    case actionTypes.LOAD_BOOKS_FAILURE:
      return {
        ...state,
        isLoaded: false,
        error: payload,
        isLoading: false
      }
    case actionTypes.LOAD_MORE_BOOKS_START:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOAD_MORE_BOOKS_SUCCESS:
      return {
        ...state,
        items: [...state.items, ...payload],
        isLoaded: true,
        isLoading: false
      }
    case actionTypes.LOAD_MORE_BOOKS_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: payload,
        isLoading: false
      }
    default:
      return state
  }
}
