import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addPlant} from '../store/allplantsReducer'
import {getTypes} from '../store/typesReducer'

// COMPONENT

const initialState = {
  name: '',
  imageUrl: '',
  description: '',
  inventory: '',
  price: '',
  light: 'direct',
  water: 'daily',
  humidity: 'low',
  type: 'Calathea',
}

class AddPlant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageUrl: '',
      description: '',
      inventory: '',
      price: '',
      light: 'direct',
      water: 'daily',
      humidity: 'low',
      type: 'Calathea',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getTypes()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('this.state', this.state)
    const typeId = this.props.types.filter(
      (type) => type.name === this.state.type
    )[0].id
    console.log('this.state.type', this.state.type)
    console.log('typeId:', typeId)
    this.props.addPlant({
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      light: this.state.light,
      water: this.state.water,
      humidity: this.state.humidity,
      inventory: Number(this.state.inventory),
      price: Number(this.state.price),
      typeId: typeId,
    })
    this.setState(initialState)
    // redirect to new plant's page
    this.props.history.push('/plants')
  }

  render() {
    return (
      <div className="add-plant">
        <h2>Enter Plant Details</h2>
        <form id="add-plant-form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="input-box"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor="imageUrl">Image URL</label>
            <input
              className="input-box"
              name="imageUrl"
              onChange={this.handleChange}
              value={this.state.imageUrl}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              className="input-box"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </div>
          <div>
            <label htmlFor="inventory">Number in Inventory</label>
            <input
              className="input-box"
              name="inventory"
              onChange={this.handleChange}
              value={this.state.inventory}
            />
          </div>
          <div>
            <label htmlFor="price">Price $</label>
            <input
              className="input-box"
              name="price"
              onChange={this.handleChange}
              value={this.state.price}
            />
          </div>
          <div className="add-plant-light">
            <label htmlFor="light">Light</label>
            <select
              onChange={this.handleChange}
              value={this.state.light}
              name="light"
            >
              <option>direct</option>
              <option>indirect</option>
              <option>none</option>
            </select>
          </div>
          <div className="add-plant-water">
            <label htmlFor="water">Water</label>
            <select
              onChange={this.handleChange}
              value={this.state.water}
              name="water"
            >
              <option>daily</option>
              <option>bi-weekly</option>
              <option>weekly</option>
            </select>
          </div>
          <div className="add-plant-humidity">
            <label htmlFor="humidity">Humidity</label>
            <select
              onChange={this.handleChange}
              value={this.state.humidity}
              name="humidity"
            >
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>
          </div>
          <div className="add-plant-type">
            <label htmlFor="type">type</label>
            <select
              onChange={this.handleChange}
              value={this.state.type}
              name="type"
            >
              {this.props.types.map((type) => {
                return <option key={type.id}>{type.name}</option>
              })}
            </select>
          </div>
          <button id="add-plant-btn" type="submit">
            Add Plant
          </button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    types: state.types.all,
  }
}

const mapDispatch = (dispatch) => {
  return {
    addPlant: (plant) => dispatch(addPlant(plant)),
    getTypes: () => dispatch(getTypes()),
  }
}

export default connect(mapState, mapDispatch)(AddPlant)
