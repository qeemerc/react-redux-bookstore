import axios from "axios"
import * as actionTypes from "../actionTypes"


export const loadCategories = () => dispatch => {
  axios('/categories.json').then( ({data}) => {
      dispatch({
        type: actionTypes.LOAD_CATEGORIES,
        payload: data
      })
  })
}

export const setFilter = (filter) => dispatch => {
  dispatch({
    type: actionTypes.SET_FILTER,
    payload: filter
  })
}

export const clearFilter = () => dispatch => {
  dispatch({
    type: actionTypes.CLEAR_FILTER
  })
}

export const searchBook = (value) => dispatch => {
  dispatch({
    type: actionTypes.SEARCH_BOOK,
    payload: value
  })
}
