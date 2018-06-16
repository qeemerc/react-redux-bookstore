import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Sidebar from "../components/Sidebar"
import Book from "../containers/Book"
import { Container, Grid, Loader, Card } from 'semantic-ui-react'

import { loadBooks, loadMoreBooks } from '../actions/books'
import { loadCategories } from '../actions/filter'
import { searchBook } from '../selectors/books'

class Books extends Component {

  componentDidMount (){
    const { loadBooks, loadCategories } = this.props
    loadBooks()
    loadCategories()
    this.scrollBooks = window.addEventListener('scroll', (e) => {
      if(this.props.isLoadedBooks && this.scroller && this.props.books.length > 0){
        this.handleScroll(e)
      }
    })
  }

  handleScroll = (e) => {
   
  }

  renderBooks() {

    const { books, isLoading, isMobile } = this.props

    if (books.length < 1) return <p>Ничего не найдено...</p>

    return (
      <Card.Group itemsPerRow={ isMobile ? 2 : 4 }>
          { 
            books.map( (book, index) => {
              return (
                  <Book key={index} book={book} />
              )
            })
          }
        {isLoading ? <Loader active inline='centered' /> : false}
      </Card.Group>
  
    )
  }

  render() {
    return (
      <div ref={scroller => this.scroller = scroller}>
        <Container>
          <Grid columns="2" stackable={true}>
            { this.props.isMobile && this.props.isLoadedCategories && (
              <div className="column three wide">
                <Sidebar />
              </div>
            )}
            <div className="column thirteen wide">
              { this.props.isLoadedBooks ? this.renderBooks() : <Loader active inline='centered' /> }
            </div>
            
              { !this.props.isMobile && this.props.isLoadedCategories && (
                <div className="column three wide">
                  <Sidebar />
                </div>
                )}
          </Grid>
        </Container>
      </div>
    )
  }
}

Books.propTypes = {
  isMobile: PropTypes.bool.isRequired,
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
  isMobile: state.settings.isMobile,
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
