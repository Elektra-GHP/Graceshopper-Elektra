import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPlant, editPlant} from '../store/singlePlantReducer'
import {addPlant} from '../store/cartReducer'
import {getTypes} from '../store/typesReducer'
import Cart from './Cart'

// COMPONENT

const initialState = {
  name: '',
  imageUrl: '',
  description: '',
  inventory: '',
  price: '',
  light: '',
  water: '',
  humidity: '',
  type: '',
}

class SinglePlant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageUrl: '',
      description: '',
      inventory: '',
      price: '',
      light: '',
      water: '',
      humidity: '',
      // type: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchPlant(id)
    this.props.getTypes()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    // const typeId = this.props.types.filter(
    //   (type) => type.name === this.state.type
    // )[0].id
    const editedFields = {}
    for (let key in this.state) {
      if (
        this.state[key] !== this.props.plant[key] &&
        this.state[key].length > 0
      ) {
        editedFields[key] = this.state[key]
      }
    }
    this.props.editPlant(this.props.plant.id, editedFields)
    this.setState(initialState)
  }

  render() {
    const plant = this.props.plant
    const user = this.props.user
    return (
      <div className="single-plant">
        <div className="plant-user-view">
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
        </div>
        {user.isAdmin && (
          <div className="plant-admin-view">
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
              <div>
                <label htmlFor="light">Light (none, indirect, direct)</label>
                <input
                  className="input-box"
                  name="light"
                  onChange={this.handleChange}
                  value={this.state.light}
                />
              </div>
              <div>
                <label htmlFor="water">Water (daily, bi-weekly, weekly) </label>
                <input
                  className="input-box"
                  name="water"
                  onChange={this.handleChange}
                  value={this.state.water}
                />
              </div>
              <div>
                <label htmlFor="humidity">Humidity (low, medium, high)</label>
                <input
                  className="input-box"
                  name="humidity"
                  onChange={this.handleChange}
                  value={this.state.humidity}
                />
              </div>
              {/* <div className="add-plant-light">
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
              </div> */}
              <button id="add-plant-btn" type="submit">
                Edit Plant
              </button>
            </form>
          </div>
        )}
        <Cart />
      </div>
    )
  }
}

const mapState = (state) => {
  console.log('state in single plant:', state)
  return {
    user: state.user,
    plant: state.plant.single,
    types: state.types.all,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchPlant: (id) => dispatch(fetchPlant(id)),
    addPlant: (userId, plantId) => dispatch(addPlant(userId, plantId)),
    editPlant: (plantId, plant) => dispatch(editPlant(plantId, plant)),
    getTypes: () => dispatch(getTypes()),
  }
}

export default connect(mapState, mapDispatch)(SinglePlant)
