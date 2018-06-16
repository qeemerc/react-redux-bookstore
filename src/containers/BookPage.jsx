import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBookById } from '../actions/bookPage'
import { Link } from 'react-router-dom'
import { Container, Grid, Item, Label, Card, Image, Button, Icon, Loader } from 'semantic-ui-react'
import { getLoadedBook, getLatestBooksFromHistory } from '../selectors/bookPage'

class BookPage extends Component {

  componentDidMount(){
    this.props.fetchBookById(this.props.match.params.id)
  }

  componentDidUpdate() {
    const { book, match, fetchBookById } = this.props
    if(book) {
      if (book.id != (+match.params.id)){
        fetchBookById(match.params.id)
      }
    }
  }

  renderBookInfo() {
    const { book, history, match } = this.props
    if (!book || book.id != match.params.id ) return <Loader active inline='centered' />

    return (
        <div className="book-info">

          <Button color="grey" className="back-btn" onClick={history.goBack} animated>
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name='left arrow' />
            </Button.Content>
          </Button>
          <Item.Group divided>
            <Item>
              <Item.Image size="medium" src={book.image} />

              <Item.Content>
                <Item.Header as='a'>{book.title}</Item.Header>
                <Item.Meta>
                  <span className='cinema'>{book.author}</span>
                </Item.Meta>
                <Item.Description>{book.description}</Item.Description>
                <Item.Extra>
                  {book.category.map( (category, index) => <Label key={index}>{category}</Label> )}
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>

        </div>
    )
  }

  renderBookCopies() {
    const { book, match, latestBooks, isMobile } = this.props
    if (!book || book.id != match.params.id ) return false
    return (
        <div>
          <p className="latest-book-title">История просмотров</p>
          <Card.Group itemsPerRow={isMobile ? 2 : 3}>
            { latestBooks.map((book, index) => {
              if (index <= 2) {
                return (
                  <Card key={index}>
                    <Image src={book.image} className="latest-book-img" size="medium" />
                    <Card.Content>
                        <Card.Header>
                          {book.title}
                        </Card.Header>
                        <Card.Meta>
                          <span className='date'>
                            {book.author}
                          </span>
                        </Card.Meta>
                        <Card.Description>
                            <Link to={`${book.id}`}><Button>Подробнее</Button></Link>
                        </Card.Description>
                      </Card.Content>
                    </Card>
                )
              }
            }) }
          </Card.Group>
        </div>
    )
  }

  render(){
    const { book } = this.props
    return (
      <Container>
        <Grid stackable={true}>
          <div className="column sixteen wide">
            { book && this.renderBookInfo() }
          </div>

          <div className="column twelve wide">
            { book && this.renderBookCopies()}
          </div>
        </Grid>
      </Container>
    )
  }
}

BookPage.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  book: PropTypes.object,
  latestBooks: PropTypes.array.isRequired,
  fetchBookById: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isMobile: state.settings.isMobile,
  book: getLoadedBook(state),
  latestBooks: getLatestBooksFromHistory(state)
})

const mapDispatchToProps = {
  fetchBookById
}


export default connect(mapStateToProps, mapDispatchToProps)(BookPage)
