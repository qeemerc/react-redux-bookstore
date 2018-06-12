import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import books from './books';
import cart from './cart'
import bookPage from './bookPage'
import filter from './filter'

export default combineReducers({
    routerReducer,
    books,
    cart,
    bookPage,
    filter
})
