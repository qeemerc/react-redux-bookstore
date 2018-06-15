import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Grid, Table, Button, Image, Label, Icon, Loader } from 'semantic-ui-react'
import { getCartItems, getTotalCost } from '../selectors/cart'
import { checkOut, clearCart, removeItem } from '../actions/cart'

class Cart extends Component {

  checkBookCount = (id) => {
    const { items } = this.props
    let count = 0;
    for(let book in items) {
      if(book.id === id ) count++
    }
    return count
  }

  renderCart() {
    const {items, totalCost, checkOut, clearCart, removeItem} = this.props

    if (!items) return <Loader active inline='centered' />

    if (items.length < 1) return <p>Корзина пуста...</p>

    return (
        <div className="cart-info">
          <Table size="small" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Количество </Table.HeaderCell>
                <Table.HeaderCell>Постер</Table.HeaderCell>
                <Table.HeaderCell>Название</Table.HeaderCell>
                <Table.HeaderCell>Автор</Table.HeaderCell>
                <Table.HeaderCell>Категории</Table.HeaderCell>
                <Table.HeaderCell>Рейтинг</Table.HeaderCell>
                <Table.HeaderCell>Цена</Table.HeaderCell>
                <Table.HeaderCell>Сумма</Table.HeaderCell>
                <Table.HeaderCell>Удалить</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>

              {items.map( (book, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{book.count}</Table.Cell>
                    <Table.Cell>
                      <Image size="mini" centered src={book.image} />
                    </Table.Cell>
                    <Table.Cell>{book.title}</Table.Cell>
                    <Table.Cell>{book.author}</Table.Cell>
                    <Table.Cell textAlign="center">{book.category.map( (category, index) => <Label as='a' key={index}>{category}</Label> )}</Table.Cell>
                    <Table.Cell>
                      <Icon name="star" />
                      {book.rating}
                    </Table.Cell>
                    <Table.Cell>
                      <Icon name="rub" />
                      {book.price}
                    </Table.Cell>
                    <Table.Cell>
                      <Icon name="rub" />
                      {book.count*book.price}
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => removeItem(book.id)} icon>
                        <Icon name="delete" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                )
              })}

            </Table.Body>
          </Table>

          <div className="total">
            <Label>
              <Icon name='rub' /> Total: {totalCost}
            </Label>
          </div>

          <Button.Group>
            <Button onClick={() => checkOut(items)} positive>Оформить заказ</Button>
            <Button.Or />
            <Button onClick={clearCart} negative>Очистить коризну</Button>
          </Button.Group>

        </div>
    )
  }

  render(){
    const { items } = this.props
    return (
      <Container>
        <Grid>
          <div className="column eighteen wide">
            { items && this.renderCart() }
          </div>
        </Grid>
      </Container>
    )
  }
}

Cart.propTypes = {
  items: PropTypes.array.isRequired,
  totalCost: PropTypes.number.isRequired,
  checkOut: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  items: getCartItems(state),
  totalCost: getTotalCost(state)
})

const mapDispatchToProps = {
  checkOut,
  clearCart,
  removeItem
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
