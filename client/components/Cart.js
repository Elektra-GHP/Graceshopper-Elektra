import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {
  fetchCart,
  deleteItem,
  editQuantity,
  editQuantGuest,
  removeItemGuest
} from '../store/cartReducer'
import {Link} from 'react-router-dom'
// import {Cart, CheckoutButton, Product} from 'react-shopping-cart'

class Cart extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const userId = this.props.user.id
    if (userId) {
      this.props.fetchCart(userId)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      const userId = this.props.user.id
      this.props.fetchCart(userId)
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.history.push('/checkout')
  }

  render() {
    const cart = this.props.cart
    return (
      <div className="cart">
        <Link to="/cart">
          <div className="cart-icon">
            <img src="https://assets.website-files.com/5a0ca7f60d22aa0001465873/5a283c93be5d2300015bb57e_wheelbarrow-black.png" />
          </div>
        </Link>
        {cart.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          <p>You have {cart.length} item(s) in your cart</p>
        )}
        {cart.map(plant => {
          return (
            <div key={plant.id} className="checkout-item">
              <img src={plant.imageUrl} className="checkout-plant-img" />
              <h2>
                <Link to={`/plants/${plant.id}`}>{plant.name}</Link>
              </h2>
              <p>{plant.item.quantity}</p>
              <button
                type="button"
                onClick={() =>
                  this.props.user.id
                    ? this.props.deleteItem(this.props.user.id, plant.id)
                    : this.props.removeItemGuest(plant.id)
                }
              >
                Remove Item
              </button>
              <button
                type="button"
                onClick={() =>
                  this.props.user.id
                    ? this.props.editQuantity(
                        this.props.user.id,
                        plant.id,
                        plant.item.quantity + 1
                      )
                    : this.props.editQuantGuest(plant, plant.item.quantity + 1)
                }
              >
                {' '}
                +{' '}
              </button>
              <button
                type="button"
                onClick={() =>
                  this.props.user.id
                    ? this.props.editQuantity(
                        this.props.user.id,
                        plant.id,
                        plant.item.quantity - 1
                      )
                    : this.props.editQuantGuest(plant, plant.item.quantity - 1)
                }
              >
                {' '}
                -{' '}
              </button>
              <hr />
            </div>
          )
        })}
        <div>
          Total: $
          {cart
            .reduce(
              (sum, currentPlant) =>
                sum + currentPlant.item.quantity * currentPlant.price,
              0
            )
            .toFixed(2)}
        </div>
        {/* <button type="button" onClick={this.handleSubmit}> Checkout </button> */}
        {this.props.checkingOut === false && (
          <Link to="/checkout" id="checkout-btn">
            Checkout
          </Link>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart.active
  }
}
const mapDispatch = dispatch => {
  return {
    fetchCart: id => dispatch(fetchCart(id)),
    deleteItem: (userId, plantId) => dispatch(deleteItem(userId, plantId)),
    editQuantity: (userId, plantId, newQuant) =>
      dispatch(editQuantity(userId, plantId, newQuant)),
    editQuantGuest: (plant, newQuant) =>
      dispatch(editQuantGuest(plant, newQuant)),
    removeItemGuest: plantId => dispatch(removeItemGuest(plantId))
  }
}
export default connect(mapState, mapDispatch)(Cart)
