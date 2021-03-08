import React, {Component} from 'react'
import {connect} from 'react-redux'
import {singleType} from '../store/typesReducer'
import {Link} from 'react-router-dom'

class Type extends Component {
  componentDidMount() {
    this.props.singleType(this.props.match.params.typeId)
  }
  render() {
    const types = this.props.types
    const plants = this.props.plants
    return (
      <div>
        <h1>{types.name}</h1>
        <p>{types.origin}</p>
        <p>{types.description}</p>
        <div>
          {this.types.plants ? (
            plants.map(plant => {
              return (
                <div key={plant.id}>
                  <Link to={`/plants/${plant.id}`}> {plant.name}</Link>
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

const mapState = state => {
  return {
    type: state.type
  }
}

const mapDispatch = dispatch => {
  return {
    singleType: typeId => dispatch(singleType(typeId))
  }
}

export default connect(mapState, mapDispatch)(Type)
