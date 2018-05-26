import axios from 'axios'
import * as actionTypes from '../actionTypes'

export const fetchBookById = (id) => dispatch => {
  axios('/books.json').then( ({data}) => {
      const book = data[id]
      dispatch({
        type: actionTypes.FETCH_BOOK_BY_ID,
        payload: book
      })
  })
}
