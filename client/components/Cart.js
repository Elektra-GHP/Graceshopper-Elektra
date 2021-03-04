import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cartReducer'
// import {Cart, CheckoutButton, Product} from 'react-shopping-cart'

class Cart extends PureComponent {
  componentDidMount() {
    const userId = this.props.match.id
    this.props.fetchCart(userId)
  }
  render() {
    const plant = this.props.plant
    const cart = this.props.cart
    // const cart = []
    // console.log('plant in singlePlant component:', plant)
    // console.log('user props----->', this.props)
    return (
      <div>
        {cart.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          <p>You have {cart.length} items in your cart</p>
        )}
        {cart.map(item => {
          return (
            <div key={item.id}>
              <img src={plant.imageUrl} className="single-plant-img" />
              <h2>{plant.name}</h2>
              <p>
                ${plant.price} X {cart.quantity}
              </p>
              <button type="button"> Remove Item </button>
              <div>Total:</div>
              <button type="button"> Checkout </button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}
const mapDispatch = dispatch => {
  return {
    fetchCart: id => dispatch(fetchCart(id))
  }
}
export default connect(mapState, mapDispatch)(Cart)
