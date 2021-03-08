import React, {PureComponent} from ‘react’
import {connect} from ‘react-redux’
import {fetchCart, deleteItem, editQuantity} from ‘../store/cartReducer’
import {Link} from ‘react-router-dom’
// import {Cart, CheckoutButton, Product} from ‘react-shopping-cart’
class Cart extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    //console.log(‘componenentDidMount props --> ’, this.props)
  }
  componentDidUpdate(prevProps) {
    console.log(‘componenentDidUpdate props --> ‘, this.props)
    if (this.props.user.id !== prevProps.user.id) {
      const userId = this.props.user.id
      this.props.fetchCart(userId)
    }
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.history.push(‘/checkout’)
  }
  render() {
    //const plant = this.props.plant
    const cart = this.props.cart
    //const cart = []
    // console.log(‘plant in singlePlant component:’, plant)
    console.log(‘CART ----->‘, cart)
    return (
      <div className=“cart”>
        <Link to=“/cart”>Your Cart</Link>
        {cart.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          <p>You have {cart.length} items in your cart</p>
        )}
        {cart.map((plant) => {
          return (
            <div key={plant.id} className=“checkout-item”>
              <img src={plant.imageUrl} className=“checkout-plant-img” />
              <h2>{plant.name}</h2>
              <p>
                ${plant.price} X {plant.item.quantity}
              </p>
              <button
                type=“button”
                onClick={() =>
                  this.props.deleteItem(this.props.user.id, plant.id)
                }
              >
                Remove Item
              </button>
              <button
                type=“button”
                onClick={() =>
                  this.props.editQuantity(
                    this.props.user.id,
                    plant.id,
                    plant.item.quantity + 1
                  )
                }
              >
                {’ ‘}
                +{’ ‘}
              </button>
              <button
                type=“button”
                onClick={() =>
                  this.props.editQuantity(
                    this.props.user.id,
                    plant.id,
                    plant.item.quantity - 1
                  )
                }
              >
                {’ ‘}
                -{’ ’}
              </button>
              <hr />
            </div>
          )
        })}
        <div>Total:</div>
        {/* <button type=“button” onClick={this.handleSubmit}> Checkout </button> */}
        {this.props.checkingOut === false && (
          <Link to=“/checkout” id=“checkout-btn”>
            Checkout
          </Link>
        )}
      </div>
    )
  }
}
const mapState = (state) => {
  // console.log(‘state in cart ---> ’ , state)
  return {
    user: state.user,
    cart: state.cart,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
    deleteItem: (userId, plantId) => dispatch(deleteItem(userId, plantId)),
    editQuantity: (userId, plantId, newQuant) =>
      dispatch(editQuantity(userId, plantId, newQuant)),
  }
}
export default connect(mapState, mapDispatch)(Cart)
