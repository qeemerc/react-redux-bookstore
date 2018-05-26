import axios from "axios"
import * as actionTypes from "../actionTypes"

export const loadBooks = () => dispatch => {
  axios('/books.json').then( ({data}) => {
      dispatch({
        type: actionTypes.LOAD_BOOKS,
        payload: data
      })
  })
}
