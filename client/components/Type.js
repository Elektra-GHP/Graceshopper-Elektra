import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleType} from '../store/typesReducer'
import {fetchPlantsAll} from '../store/allplantsReducer'
import {Link} from 'react-router-dom'

class Type extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getSingleType(id)
    this.props.fetchPlantsAll()
  }
  render() {
    const type = this.props.singleType
    const plants = this.props.plants
    const filterPlants = plants.filter((plant) => {
      return plant.type.id === type.id
    })

    return (
      <div>
        <h1>Name: {type.name}</h1>
        <p>Origin: {type.origin}</p>
        <p>Description: {type.description}</p>

        <div>
          {filterPlants.length > 0 ? (
            filterPlants.map((plant) => {
              return (
                <div key={plant.id} className="all-plants-plant">
                  <img src={plant.imageUrl} className="all-plants-img" />
                  <div className="all-plants-name">
                    <Link to={`/plants/${plant.id}`}>{plant.name}</Link>
                  </div>
                </div>
              )
            })
          ) : (
            <p>"No plants available under this type."</p>
          )}
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    singleType: state.types.singleType,
    plants: state.plants.all,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getSingleType: (typeId) => dispatch(getSingleType(typeId)),
    fetchPlantsAll: () => dispatch(fetchPlantsAll()),
  }
}

export default connect(mapState, mapDispatch)(Type)
