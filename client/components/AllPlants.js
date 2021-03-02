import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPlants} from '../store/allPlantsReducer'

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
    console.log('plants in AllPlants render:', this.props)
    return (
      <div>
        <h1>Plants</h1>
        {plants.map(plant => {
          return (
            <div key={plant.id}>
              <img scr={plant.imageUrl} />
              <h2>{plant.name}</h2>
              <div>{plant.type.name}</div>
              <div>{plant.price}</div>
            </div>
          )
        })}
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
