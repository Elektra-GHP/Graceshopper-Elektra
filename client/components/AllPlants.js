import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPlants} from '../store/allPlantsReducer'
import Cart from './Cart'
// COMPONENT

class AllPlants extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.fetchPlants()
  }

  render() {
    const plants = this.props.plants
    console.log('plants in AllPlants render:', plants)
    return (
      <div>
        <h1>Plants</h1>
        <div className="container">
          {plants.map(plant => {
            return (
              <div key={plant.id} className="all-plants-plant">
                <img src={plant.imageUrl} className="all-plants-img" />
                <div className="all-plants-name">
                  <Link to={`/plants/${plant.id}`}>{plant.name}</Link>
                </div>
                <div>{plant.type.name}</div>
                <div>{plant.price}</div>
                <button type="button"> ADD </button>
              </div>
            )
          })}
          <Cart />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    plants: state.plants.all
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPlants: () => dispatch(fetchPlants())
  }
}

export default connect(mapState, mapDispatch)(AllPlants)
