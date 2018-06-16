import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Image, Button, Label, Icon } from 'semantic-ui-react'
import { addBookToCart } from '../actions/cart'
import { checkBookInCart } from '../selectors/cart'

const Book = ({ book, addBookToCart, addedBooks}) => {
  return (
    <Card>
      <Image className="book-img" src={book.image} size="medium" />
      <Card.Content>
          <Card.Header>
            {book.title}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {book.author}
            </span>
            <Icon name="rub" />{book.price}
          </Card.Meta>
          <Card.Description>

              <Link to={`book/${book.id}`}><Button>Подробнее</Button></Link>

          </Card.Description>
        </Card.Content>

      <Card.Content extra>
        <Button 
          onClick={() => addBookToCart(book)} 
          primary
        >
          Add to cart 
        </Button>
        <Label color="green">{addedBooks}</Label>
      </Card.Content>
    </Card>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  addedBooks: PropTypes.number.isRequired,
  addBookToCart: PropTypes.func.isRequired
}

const mapStateToProps = ({cart}, book) => ({
  addedBooks: checkBookInCart(cart, book)
})

const mapDispatchToProps = {
  addBookToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)
