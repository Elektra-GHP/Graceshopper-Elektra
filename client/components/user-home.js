import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ContactForm from './ContactForm'
import {getUser, updateUser, deleteUser} from '../store/userHomeReducer'

/**
 * COMPONENT
 */
// export const UserHome = (props) => {
//   const {email} = props

export class UserHome extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id)
  }

  handleDelete(id) {
    this.props.deleteUser(id)

    this.setState()
  }

  handleUpdate(user) {
    this.props.updateUser(user)
    this.setState()
  }

  render() {
    const {name} = this.props
    console.log('inside render')
    return (
      <div>
        <h2>Welcome, {name}</h2>
        <div className="user-home-page">
          <h3>My Orders</h3>
          <button type="button"> View Orders</button>

          <h3>Settings</h3>
          <button type="button"> Personal Info </button>

          <h3>Reach Out To Us</h3>

          <ContactForm />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('inside mapState')
  return {
    user: state.user,
  }
}

// getUser, updateUser, deleteUser
const mapDispatch = (dispatch) => {
  console.log('inside mapdispatch')
  return {
    getUser: (id) => dispatch(getUser(id)),
    updateUser: (user) => dispatch(updateUser(user)),
    deleteUser: (id) => dispatch(deleteUser(id)),
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
