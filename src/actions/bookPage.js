import axios from 'axios'
import * as actionTypes from '../actionTypes'

export const fetchBookById = (id) => dispatch => {
  axios.get('https://5b1f792317cc7000142ed492.mockapi.io/bookstore/books').then( ({data}) => {
      const book = data[id]
      dispatch({
        type: actionTypes.FETCH_BOOK_BY_ID,
        payload: book
      })
  })
}
