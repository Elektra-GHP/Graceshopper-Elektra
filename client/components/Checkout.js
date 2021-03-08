import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cartReducer'

class Checkout extends Component {
  componentdDidMount() {
    this.props.fetchCart()
  }
  render() {
    console.log('user---', this.props.user)
    const cart = this.props.cart
    return (
      <div>
        <h2>Order Confirmation</h2>
        <p>Order Number {cart.id}</p>
        <div className="cart">
          {cart.map(plant => {
            return (
              <div key={plant.id} className="checkout-item">
                <h3>{plant.name}</h3>
                <img src={plant.imageUrl} className="checkout-plant-img" />
                <p>
                  ${plant.price} X {plant.item.quantity}
                </p>
              </div>
            )
          })}
          <div>
            Total: $0
            {/* Total: ${cart.reduce((plant, total) => {
               total+=({plant.price}*{plant.item.quantity})
                return total
              }, 0)} */}
          </div>
          <div>Shipping Address</div>
        </div>
      </div>
    )
  }
}
const mapState = state => {
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
export default connect(mapState, mapDispatch)(Checkout)
