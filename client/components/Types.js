import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getTypes} from '../store/typesReducer'

class Types extends Component {
  componentDidMount() {
    this.props.getTypes()
    console.log('inside componentDidMount')
  }

  render() {
    console.log('inside render')
    const types = this.props.types
    console.log(types)

    return (
      <div>
        <h1>Types</h1>
        <div>
          {types.map((type) => {
            return (
              <div key={type.id}>
                <Link to={`/plants/types/${type.id}`}>
                  <h3 key={type.name}>{type.name}</h3>
                </Link>

                <p key={type.description}>{type.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  console.log('inside mapState')
  return {
    types: state.types.all,
  }
}

const mapDispatch = (dispatch) => {
  console.log('inside mapDispatch')
  return {
    getTypes: () => dispatch(getTypes()),
  }
}

export default connect(mapState, mapDispatch)(Types)
