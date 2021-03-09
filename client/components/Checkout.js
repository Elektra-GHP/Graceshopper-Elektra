import React from 'react'
import {connect} from 'react-redux'
import {checkout, guestCheckout} from '../store/cartReducer'
import Cart from './Cart'

const initialState = {
  ccNumber: '',
  ccExpDate: '',
  ccCVV: '',
  shippingAddress: '',
  errors: [],
}

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ccNumber: '',
      ccExpDate: '',
      ccCVV: '',
      shippingAddress: '',
      errors: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const errors = []
    if (this.state.ccNumber.length < 16) {
      errors.push('Please enter a valid card number.')
    }
    if (this.state.ccExpDate.length !== 5) {
      errors.push('Please enter a valid expiration date (MM/DD).')
    }
    if (this.state.ccCVV.length < 3 || this.state.ccCVV.length > 4) {
      errors.push('Please enter a valid CCV (3-4 digits).')
    }
    if (errors.length < 1) {
      this.props.user.id
        ? this.props.checkout(this.props.user.id, this.state.shippingAddress)
        : this.props.guestCheckout(this.props.cart, this.state.shippingAddress)
      this.setState(initialState)
      this.props.history.push('/orderConfirmation')
    }
    this.setState({errors: errors})
  }

  render() {
    console.log('checking out?', this.props.checkingOut)
    return (
      <div className="checkout-page">
        <div>
          <form id="checkout-form" onSubmit={this.handleSubmit}>
            <div className="shipping-details">
              <h2>Shipping Details</h2>
              <div>
                <label htmlFor="shippingAddress">Shipping Address</label>
                <input
                  className="input-box"
                  name="shippingAddress"
                  onChange={this.handleChange}
                  value={this.state.shippingAddress}
                />
              </div>
            </div>
            <div className="payment-details">
              <h2>Payment Details</h2>
              <div>
                <label htmlFor="ccNumber">Card Number</label>
                <input
                  className="input-box"
                  name="ccNumber"
                  onChange={this.handleChange}
                  value={this.state.ccNumber}
                />
              </div>
              <div>
                <label htmlFor="ccExpDate">Expiration Date (MM/YY)</label>
                <input
                  className="input-box"
                  name="ccExpDate"
                  onChange={this.handleChange}
                  value={this.state.ccExpDate}
                />
              </div>
              <div>
                <label htmlFor="ccCVV">CVV</label>
                <input
                  className="input-box"
                  name="ccCVV"
                  onChange={this.handleChange}
                  value={this.state.ccCVV}
                />
              </div>
            </div>
            <button id="confirm-order-btn" type="submit">
              Confirm Order
            </button>
          </form>
          {this.state.errors.length > 0 &&
            this.state.errors.map((error) => (
              <h3 key={this.state.errors.indexOf(error)}>{error}</h3>
            ))}
        </div>
        <div className="checkout-cart">
          <Cart checkingOut={true} />
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    cart: state.cart,
  }
}

const mapDispatch = (dispatch) => {
  return {
    checkout: (userId, shippingAddress) =>
      dispatch(checkout(userId, shippingAddress)),
    guestCheckout: (cart, shippingAddress) =>
      dispatch(guestCheckout(cart, shippingAddress)),
  }
}

export default connect(mapState, mapDispatch)(Checkout)
