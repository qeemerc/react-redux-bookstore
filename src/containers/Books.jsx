import React, { Component } from 'react';
import {compose} from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import Sidebar from "../components/Sidebar"
import Book from "../components/Book"
import { Container, Grid, Loader } from 'semantic-ui-react'

import { loadBooks } from '../actions/books'
import { loadCategories } from '../actions/filter'
import { searchBook } from '../selectors/books'
import { getCategories } from '../selectors/filter'

class Books extends Component {

  componentDidMount (){
    this.props.loadBooks()
    this.props.loadCategories()
  }

  renderBooks() {

    const { books } = this.props

    if (!books) return <Loader active inline='centered' />

    if (books.length < 1) return <p>Ничего не найдено...</p>

    return (
      <ul>
        { books.map( (book) => {
          return (
            <li key={book.id} className="book-item">
              <Book book={book} />
            </li>
          )
        })}
      </ul>
    )
  }

  renderSidebar() {
    return (
      <Sidebar />
    )
  }

  render() {
    console.log("PROPS BOOKS", this.props.books)
    return (
      <Container>
        <Grid>
          <div className="column thirteen wide">
            { this.props.isLoadedBooks && this.renderBooks() }
          </div>
          <div className="column three wide">
            { this.props.isLoadedCategories && this.renderSidebar() }
          </div>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  books: searchBook(state),
  isLoadedBooks: state.books.isLoaded,
  isLoadedCategories: state.filter.isLoaded
})

const mapDispatchToProps = {
  loadBooks,
  loadCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)
