import React, {Component} from 'react'
import {connect} from 'react-redux'

// COMPONENT

// Fix type FK on plant model
// create reducer

class SinglePlant extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.props.fetchPlants()
  }

  render() {
    const plant = this.props.plant
    return (
      <div>
        <img scr={plant.imageUrl} />
        <h2>{plant.name}</h2>
        <p>{plant.type}</p>
        <p>{plant.price}</p>
        <p>{plant.description}</p>
        <div className="care-instructions">
          <p>Sunlight: ${plant.light}</p>
          <p>Water: ${plant.water}</p>
          <p>Humidity: ${plant.humidity}</p>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    plants: state.plants.all,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchPlants: () => dispatch(fetchPlants()),
  }
}

export default connect(mapState, mapDispatch)(SinglePlant)
