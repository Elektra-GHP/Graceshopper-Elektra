import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ContactForm from './ContactForm'
import {fetchOrders} from '../store/user-homeReducer'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.user.id)
  }

  render() {
    const user = this.props.user
    const orders = this.props.orders
    console.log('this.props.user:', user)
    console.log('this.props.orders:', orders)

    return (
      <div>
        {user.name.length > 0 ? (
          <h2>Welcome, {user.name}!</h2>
        ) : (
          <h2>Welcome, {user.email}!</h2>
        )}

        <div className="user-home-page">
          <h2>My Orders</h2>
          <table>
            <tbody>
              <tr>
                <td>Order Date</td>
                <td>Order ID</td>
                <td>Shipping Status</td>
              </tr>
              {orders.map((order) => {
                return (
                  <tr key={order.cart.id}>
                    <td>{order.cart.orderId}</td>
                    <td>{order.cart.orderDate}</td>
                    <td>{order.cart.shippingStatus}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className="account-user-info">
            <h2>User Info</h2>
            <h4>Name: {user.name}</h4>
            <h4>Email: {user.email}</h4>
          </div>

          <h2>Contact Us</h2>

          <ContactForm />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('state.userAccount:', state.userAccount)
  return {
    user: state.userAccount.user,
    orders: state.userAccount.orders,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchOrders: (userId) => dispatch(fetchOrders(userId)),
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
