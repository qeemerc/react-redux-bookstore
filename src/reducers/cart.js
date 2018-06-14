import * as actionTypes from '../actionTypes'

const initialState = {
  books: [],
  payData: null
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actionTypes.ADD_TO_CART:
      const countedCart = state.books.slice()
      let isCounted = false

      if (countedCart.length == 0){
        countedCart.push(payload)
      }else{
        for(let i=0; i < countedCart.length; i++){
          if(countedCart[i].id == payload.id){
            countedCart[i].count++
            isCounted = true
            break;
          }
        }
        !isCounted ? countedCart.push(payload) : false 
      }
      
      return {
        ...state,
        books: countedCart
      }
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        books: []
      }
    case actionTypes.CHECK_OUT:
      return {
        books: [],
        payData: payload
      }
    case actionTypes.REMOVE_FROM_CART:
      const booksAfterRemove = []
      state.books.map((book) => {
        if (payload != book.id) booksAfterRemove.push(book)
        if ( payload == book.id && book.count > 1 ) booksAfterRemove.push({...book, count: book.count-1})
      })
      return {
        ...state,
        books: booksAfterRemove
      }
    default:
      return state
  }
}
