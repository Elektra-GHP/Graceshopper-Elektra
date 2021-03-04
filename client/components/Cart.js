import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cartReducer'
import {Link} from 'react-router-dom'
import {deleteItem} from '../store/cartReducer'
// import {Cart, CheckoutButton, Product} from 'react-shopping-cart'

class Cart extends PureComponent {
  componentDidMount() {
    console.log('componenentDidMount props --> ', this.props)
  }
  componentDidUpdate(prevProps) {
    console.log('componenentDidUpdate props --> ', this.props)
    if (this.props.user.id !== prevProps.user.id) {
      const userId = this.props.user.id
      this.props.fetchCart(userId)
    }
  }
  render() {
    //const plant = this.props.plant
    const cart = this.props.cart
    //const cart = []
    // console.log('plant in singlePlant component:', plant)
    console.log('PROPS IN CART ----->', this.props)
    return (
      <div className="cart">
        <Link to="/cart">Your Cart</Link>
        {cart.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          <p>You have {cart.length} items in your cart</p>
        )}
        {cart.map(plant => {
          return (
            <div key={plant.id}>
              <img src={plant.imageUrl} className="checkout-plant-img" />
              <h2>{plant.name}</h2>
              <p>
                ${plant.price} X {plant.item.quantity}
              </p>
              <button type="button"> Remove Item </button>
            </div>
          )
        })}
        <div>Total:</div>
        <button type="button"> Checkout </button>
      </div>
    )
  }
}

const mapState = state => {
  //console.log('state in cart ---> ' , state)
  return {
    user: state.user,
    cart: state.cart
  }
}
const mapDispatch = dispatch => {
  return {
    fetchCart: id => dispatch(fetchCart(id))
  }
}
export default connect(mapState, mapDispatch)(Cart)
