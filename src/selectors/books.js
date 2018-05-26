import { createSelector } from 'reselect'

const getBooksState = (state) => state.books
const getActiveFilter = (state) => state.filter.activeFilter
const getSearchingValue = (state) => state.filter.searchValue

export const getFilteredBooks = createSelector(
  getBooksState,
  getActiveFilter,
  (books, filter ) => {
    const filteredData = []
    if(books.items){
      books.items.map((book) => book.category.includes(filter) || !filter ? filteredData.push(book) : false )
    }
    return filteredData
  }
)

export const searchBook = createSelector(
  getFilteredBooks,
  getSearchingValue,
  (books, value) => {
    const filteredData = []
    books.map( (book) => {
        const bookName = book.title.toLowerCase()
        const checkValue = value.toLowerCase();
        bookName.includes(checkValue) ? filteredData.push(book) : false
    })
    return filteredData
  }
)
