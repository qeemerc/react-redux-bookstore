import { createSelector } from 'reselect'

const getCategoriesState = (state) => state.filter

export const getCategories = createSelector(
  [getCategoriesState],
  (categories) => categories.items
)
