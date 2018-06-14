import React, { Component } from 'react';
import { connect } from 'react-redux'

import Sidebar from "../components/Sidebar"
import Book from "../containers/Book"
import { Container, Grid, Loader } from 'semantic-ui-react'

import { loadBooks, loadMoreBooks } from '../actions/books'
import { loadCategories } from '../actions/filter'
import { searchBook } from '../selectors/books'

class Books extends Component {

  componentDidMount (){
    this.props.loadBooks()
    this.props.loadCategories()
    this.scrollBooks = window.addEventListener('scroll', (e) => {
      if(this.scroller){
        this.handleScroll(e)
      }
    })
  }

  handleScroll = (e) => {
    const lastLi = document.querySelector("ul > li:last-child")
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
    const pageOffset = window.pageYOffset + window.innerHeight
    const bottomOffset = 10
    if (!this.props.isLoading && pageOffset > lastLiOffset - bottomOffset ) this.props.loadMoreBooks(20)
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
