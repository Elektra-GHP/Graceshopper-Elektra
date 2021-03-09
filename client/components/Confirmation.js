import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchConfirmedCart} from '../store/cartReducer'

class Confirmation extends Component {
  componentdDidMount() {
    console.log('in component did mount')
    let userId
    if (this.props.user.id) {
      userId = this.props.user.id
    } else {
      userId = null
    }
    console.log('userId in Confirmation:', userId)
    this.props.fetchConfirmedCart(userId)
  }

  render() {
    // const order = this.props.order
    console.log('props:', this.props)
    return (
      <div>
        <h2>Order Confirmation</h2>
        {/*<p>Order Number {order.orderId}</p>
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
        {/*} </div>
          <div>Shipping Address</div>
        </div> */}
      </div>
    )
  }
}
const mapState = (state) => {
  console.log('state in mapState:', state)
  return {
    user: state.user,
    order: state.cart.order,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchConfirmedCart: (userId) => dispatch(fetchConfirmedCart(userId)),
  }
}
export default connect(mapState, mapDispatch)(Confirmation)
