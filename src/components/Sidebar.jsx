import React from 'react';
import { connect } from 'react-redux'
import { List, Input, Button } from 'semantic-ui-react'
import { getCategories } from '../selectors/filter'
import { setFilter, clearFilter, searchBook } from '../actions/filter'

const Sidebar = ({
  categories, 
  setFilter, 
  searchBook, 
  clearFilter, 
  activeFilter, 
  searchValue
}) => {

  const handleSearch = (e) => {
    let value = e.target.value
    searchBook(value)
  }

  return (
    <div className="cats-list">
      <List link>
        {categories.map( (category) => {
          return (
            <List.Item as='a'
              onClick={() => setFilter(category.name)}
              key={category.id}
              active={ activeFilter === category.name ? true : false }
              >
                {category.name}
            </List.Item>
          )
        })}
      </List>
      <Button 
        color="red" 
        onClick={clearFilter} 
        fluid
        >
          Сбросить фильтр
      </Button>
      <Input 
        className="filter-input" 
        value={searchValue} 
        onChange={(e) => handleSearch(e)} 
        placeholder='Поиск...' 
        fluid
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  categories: getCategories(state),
  activeFilter: state.filter.activeFilter,
  isLoadedCategories: state.filter.isLoaded,
  searchValue: state.filter.searchValue
})

const mapDispatchToProps = {
  setFilter,
  clearFilter,
  searchBook
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
