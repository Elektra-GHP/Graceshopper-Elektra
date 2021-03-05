import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ContactForm from './ContactForm'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <h2>Welcome, {email}</h2>
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

// https://formspree.io/f/xpzogeod

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
