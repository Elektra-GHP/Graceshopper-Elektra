import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addPlant, addPlantGuest} from '../store/cartReducer'
import {fetchPlants, deletePlant} from '../store/allPlantsReducer'
import {getTypes} from '../store/typesReducer'
import Cart from './Cart'

// COMPONENT

class AllPlants extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: 'all',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchPlants(this.props.pageNum)
    this.props.getTypes()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  componentDidUpdate() {}

  render() {
    const plants = this.props.plants.filter((plant) => {
      if (this.state.filter !== 'all') {
        return plant.type.name === this.state.filter
      }
      return plant
    })

    return (
      <div>
        <h1>Plants</h1>
        <span className="filter">
          <label htmlFor="filter">Filter: </label>
          <select
            onChange={this.handleChange}
            value={this.state.filter}
            name="filter"
          >
            <option>all</option>
            {this.props.types.map((type) => {
              return <option key={type.id}>{type.name}</option>
            })}
          </select>
        </span>
        <div className="view">
          <div className="container">
            {plants.map(plant => {
              return (
                <div key={plant.id} className="all-plants-plant">
                  <img src={plant.imageUrl} className="all-plants-img" />
                  <div className="all-plants-name">
                    <Link to={`/plants/${plant.id}`}>{plant.name}</Link>
                    <div>{plant.price}</div>
                  </div>
                  <Link to={`/plants/types/${plant.type.id}`}>
                    {plant.type.name}
                  </Link>
                  {plant.inventory < 1 ? (
                    <h3>Sold Out</h3>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        this.props.user.id
                          ? this.props.addPlant(this.props.user.id, plant.id)
                          : this.props.addPlantGuest(plant)
                      }
                    >
                      ADD
                    </button>
                  )}

                  {this.props.user.isAdmin && (
                    <div className="plants-admin-buttons">
                      <button
                        type="button"
                        onClick={() => this.props.deletePlant(plant.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
            {this.props.user.isAdmin && <Link to="/add-plant">Add Plant</Link>}
          </div>
          <Cart checkingOut={false} />
        </div>
        <div className="pagination">
          <button
            type="button"
            onClick={() => this.props.fetchPlants(this.props.pageNum - 1)}
          >{`Prev: ${this.props.pageNum - 1}`}</button>
          <p>{`${this.props.pageNum}`}</p>
          <button
            type="button"
            onClick={() => this.props.fetchPlants(this.props.pageNum + 1)}
          >{`Next: ${this.props.pageNum + 1}`}</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    plants: state.plants.all,
    user: state.user,
    pageNum: state.plants.pageNum,
    types: state.types.all,
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPlants: pageNum => dispatch(fetchPlants(pageNum)),
    addPlant: (userId, plantId) => dispatch(addPlant(userId, plantId)),
    deletePlant: (plantId) => dispatch(deletePlant(plantId)),
    addPlantGuest: (plant) => dispatch(addPlantGuest(plant)),
    getTypes: () => dispatch(getTypes()),
  }
}

export default connect(mapState, mapDispatch)(AllPlants)
