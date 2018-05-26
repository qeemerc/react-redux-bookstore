import { createSelector } from 'reselect'

const getBookPageState = (state) => state.bookPage

export const getLoadedBook = createSelector(
  getBookPageState,
  (bookPage) => bookPage.book
)

export const getLatestBooksFromHistory = createSelector(
  getBookPageState,
  ({bookHistory}) => bookHistory.reverse()
)
