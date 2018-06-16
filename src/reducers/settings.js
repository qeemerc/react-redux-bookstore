import * as actionTypes from '../actionTypes'

const initialState = {
  isMobile: false
}

export default (state = initialState, {type, payload}) => {
  switch(type){
    case actionTypes.CHECK_IS_MOBILE:
      return {
        ...state,
        isMobile: payload
      }
    default:
      return state
  }
}