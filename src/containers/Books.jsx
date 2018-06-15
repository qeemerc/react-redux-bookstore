import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Sidebar from "../components/Sidebar"
import Book from "../containers/Book"
import { Container, Grid, Loader } from 'semantic-ui-react'

import { loadBooks, loadMoreBooks } from '../actions/books'
import { loadCategories } from '../actions/filter'
import { searchBook } from '../selectors/books'

class Books extends Component {

  componentDidMount (){
    const { loadBooks, loadCategories } = this.props
    loadBooks()
    loadCategories()
    this.scrollBooks = window.addEventListener('scroll', (e) => {
      console.log(this.props.isLoadedBooks, "BOOKS IS LOAD")
      if(this.props.isLoadedBooks && this.scroller){
        this.handleScroll(e)
      }
    })
  }

  handleScroll = (e) => {
    const { isLoading, loadMoreBooks } = this.props
    const lastLi = document.querySelector("ul > li:last-child")
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
    const pageOffset = window.pageYOffset + window.innerHeight
    const bottomOffset = 10
    if (!isLoading && pageOffset > lastLiOffset - bottomOffset ) loadMoreBooks(20)
  }

  renderBooks() {

    const { books, isLoading } = this.props

    if (books.length < 1) return <p>Ничего не найдено...</p>

    return (
      <div>
        <ul>
          { 
            books.map( (book, index) => {
              return (
                <li key={index} className="book-item">
                  <Book book={book} />
                </li>
              )
            })
          }
        </ul>
        {isLoading ? <Loader active inline='centered' /> : false}
      </div>
  
    )
  }

  render() {
    return (
      <div ref={scroller => this.scroller = scroller}>
        <Container>
          <Grid columns="2" stackable={true}>
            <div className="column thirteen wide">
              { this.props.isLoadedBooks ? this.renderBooks() : <Loader active inline='centered' /> }
            </div>
            <div className="column three wide">
              { this.props.isLoadedCategories && <Sidebar /> }
            </div>
          </Grid>
        </Container>
      </div>
    )
  }
}

Books.propTypes = {
  books: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadedBooks: PropTypes.bool.isRequired,
  isLoadedCategories: PropTypes.bool.isRequired,
  loadBooks: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  loadMoreBooks: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  books: searchBook(state),
  isLoading: state.books.isLoading,
  isLoadedBooks: state.books.isLoaded,
  isLoadedCategories: state.filter.isLoaded
})

const mapDispatchToProps = {
  loadBooks,
  loadCategories,
  loadMoreBooks
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)
