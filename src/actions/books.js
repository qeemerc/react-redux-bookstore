import axios from "axios"
import * as actionTypes from "../actionTypes"

export const loadBooks = () => dispatch => {
  dispatch({
    type: actionTypes.LOAD_BOOKS_START
  })
  
  axios.get('https://5b1f792317cc7000142ed492.mockapi.io/bookstore/books').then( ({data}) => {
    dispatch({
      type: actionTypes.LOAD_BOOKS_SUCCESS,
      payload: data
     })
  }).catch((error) => {
    dispatch({
      type: actionTypes.LOAD_BOOKS_FAILURE,
      payload: error.response
    })
  })
}

export const loadMoreBooks = (offset) => dispatch => {

  //Так как "отступ" при mockApi не досутпен, подгружаются те же книги

  dispatch({
    type: actionTypes.LOAD_MORE_BOOKS_START
  })
  
  axios.get('https://5b1f792317cc7000142ed492.mockapi.io/bookstore/books').then( ({data}) => {
    dispatch({
      type: actionTypes.LOAD_MORE_BOOKS_SUCCESS,
      payload: data
     })
  }).catch((error) => {
    dispatch({
      type: actionTypes.LOAD_MORE_BOOKS_FAILURE,
      payload: error.response
    })
  })
}