import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPlant} from '../store/singlePlantReducer'

// in general, we shouldn't find any commented out code or debugging console logs in the main branch. Get into the habit of checking PRs for this kind of thing.

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
    console.log('plant in singlePlant component:', plant)
    return (
      <div>
        <img src={plant.imageUrl} className="single-plant-img" />
        <h2>{plant.name}</h2>
        {/* <p>{plant.type.name}</p> */}
        <p>${plant.price}</p>
        <p>{plant.description}</p>
        <div className="care-instructions">
          Care Instructions:
          <p>Sunlight: {plant.light}</p>
          <p>Water: {plant.water}</p>
          <p>Humidity: {plant.humidity}</p>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  console.log('state:', state)
  return {
    plant: state.plant.single,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchPlant: (id) => dispatch(fetchPlant(id)),
  }
}

export default connect(mapState, mapDispatch)(SinglePlant)
