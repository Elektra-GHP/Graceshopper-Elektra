import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <div className="header">
      <div className="header-left">
        <img
          id="logo"
          src="https://static.thenounproject.com/png/1298085-200.png"
        />
        <h1>
          <Link to="/home">Plantr</Link>
        </h1>
      </div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/plants">
              <div className="nav-link">
                <img src="https://images.vexels.com/media/users/3/181340/isolated/lists/0609b91d96796d33dfd6ee002be5e2d4-kalanchoe-plant-succulent.png" />{' '}
                <p>Plants</p>
              </div>
            </Link>
            <Link to="/account">
              <div className="nav-link">
                <img src="https://i.pinimg.com/originals/bb/24/ae/bb24aecc2d6e5d51bf29c72acb3f1741.png" />
                <p>Account</p>
              </div>
            </Link>
            <Link to="/types">Types</Link>
            <a href="#" onClick={handleClick}>
              <div className="nav-link">
                <img src="https://images.vexels.com/media/users/3/202344/isolated/preview/242900d7a49739d3a909fbb7263b305d-tall-mushroom-stroke-by-vexels.png" />
                <p>Logout</p>
              </div>
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/plants">
              <div className="nav-link">
                <img src="https://images.vexels.com/media/users/3/181340/isolated/lists/0609b91d96796d33dfd6ee002be5e2d4-kalanchoe-plant-succulent.png" />
                <p>Plants</p>
              </div>
            </Link>
            <Link to="/login">
              <div className="nav-link">
                <img src="https://img.icons8.com/wired/2x/login-rounded-right.png" />
                <p>Login</p>
              </div>
            </Link>
            <Link to="/signup">
              <div className="nav-link">
                <img src="https://images.vexels.com/media/users/3/212787/isolated/lists/df52a0a9737daa1f0c5a565ff99d6529-flowery-medical-cross-symbol-outline.png" />
                <p>Sign Up</p>
              </div>
            </Link>
            <Link to="/types">Types</Link>
          </div>
        )}
      </nav>
    </div>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
