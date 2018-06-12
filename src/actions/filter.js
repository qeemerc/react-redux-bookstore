import axios from "axios"
import * as actionTypes from "../actionTypes"

export const loadCategories = () => dispatch => {
  dispatch({
    type: actionTypes.LOAD_CATEGORIES_START
  })

  axios.get('https://5b1f792317cc7000142ed492.mockapi.io/bookstore/categories').then( ({data}) => {
    dispatch({
      type: actionTypes.LOAD_CATEGORIES_SUCCESS,
      payload: data
    })
  }).catch((error) => {
    dispatch({
      type: actionTypes.LOAD_CATEGORIES_FAILURE,
      payload: error.response
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
