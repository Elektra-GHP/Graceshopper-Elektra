import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {selectedPlant} from '../store/cartReducer'
// import {Cart, CheckoutButton, Product} from 'react-shopping-cart'

class Cart extends PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.selectedPlant(id)
  }
  render() {
    const plant = this.props.plant
    const cart = this.props.cart
    console.log('plant in singlePlant component:', plant)
    return (
      <div>
        <p>You have ... items in your cart</p>
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
  }
}

const mapState = state => {
  return {
    plant: state.plant
  }
}
const mapDispatch = dispatch => {
  return {
    selectedPlant: id => dispatch(selectedPlant(id))
  }
}
export default connect(mapState, mapDispatch)(Cart)
