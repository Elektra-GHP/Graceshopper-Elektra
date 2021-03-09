import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getTypes} from '../store/typesReducer'

class Types extends Component {
  componentDidMount() {
    this.props.getTypes()
  }

  render() {
    const types = this.props.types

    return (
      <div>
        <h1>Types</h1>
        {types.map((type) => {
          return (
            <div key={type.id}>
              <Link to={`/plants/types/${type.id}`}>
                <h2 key={type.name} className="type">
                  {type.name}
                </h2>
              </Link>

              <p key={type.description} className="type">
                {type.description}
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    types: state.types.all,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getTypes: () => dispatch(getTypes()),
  }
}

export default connect(mapState, mapDispatch)(Types)
