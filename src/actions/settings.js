import * as actionTypes from "../actionTypes";

export const checkIsMobile = () => (dispatch) => {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    dispatch({
      type: actionTypes.CHECK_IS_MOBILE,
      payload: true
    })
  } else {
    dispatch({
      type: actionTypes.CHECK_IS_MOBILE,
      payload: false
    })
  }
}