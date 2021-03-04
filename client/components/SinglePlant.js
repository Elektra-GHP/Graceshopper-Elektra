import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPlant} from '../store/singlePlantReducer'
import {addPlant} from '../store/cartReducer'
import Cart from './Cart'

// COMPONENT

class SinglePlant extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchPlant(id)
  }

  render() {
    const plant = this.props.plant
    const user = this.props.user
    console.log('plant in singlePlant component:', plant)
    return (
      <div className="single-plant">
        <img src={plant.imageUrl} className="single-plant-img" />
        <div>
          <h2>{plant.name}</h2>
          {/* <p>{plant.type.name}</p> */}
          <p>${plant.price}</p>
          <p>{plant.description}</p>
          <div className="care-instructions">
            Care Instructions:
            <p>Sunlight: {plant.light}</p>
            <p>Water: {plant.water}</p>
            <p>Humidity: {plant.humidity}</p>
            <button
              type="button"
              onClick={() => this.props.addPlant(user.id, plant.id)}
            >
              {' '}
              ADD TO CART{' '}
            </button>
          </div>
        </div>
        <Cart />
      </div>
    )
  }
}

const mapState = state => {
  console.log('state in single plant:', state)
  return {
    user: state.user,
    plant: state.plant.single
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPlant: id => dispatch(fetchPlant(id)),
    addPlant: (userId, plantId) => dispatch(addPlant(userId, plantId))
  }
}

export default connect(mapState, mapDispatch)(SinglePlant)
