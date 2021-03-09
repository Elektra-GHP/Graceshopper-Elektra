import axios from 'axios'

// ACTION TYPE
const GET_USER = 'GET_USER'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'
const GET_ORDERS = 'GET_ORDERS'

// ACTION CREATOR
export const _getUser = (user) => {
  return {
    type: GET_USER,
    user,
  }
}

export const _deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  }
}

export const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  }
}

const getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders,
  }
}

// THUNK
export const getUser = (id) => {
  return async (dispatch) => {
    try {
      const {data: user} = await axios.get(`/api/users/${id}`)
      dispatch(_getUser(user))
    } catch (error) {
      console.log('Error fetching user from server')
    }
  }
}

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const {data: updatedUser} = await axios.put(`/api/users/${user.id}`, user)
      dispatch(_updateUser(updatedUser))
    } catch (error) {
      console.log('Error updating user from server')
    }
  }
}

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const {data: user} = await axios.delete(`/api/users/${id}`)
      dispatch(_deleteUser(user))
    } catch (error) {
      console.log('Error deleting user from server')
    }
  }
}

export const fetchOrders = (userId) => {
  return async (dispatch) => {
    try {
      const {data: orders} = await axios.get(`/api/users/${userId}/carts`)
      dispatch(getOrders(orders))
    } catch (error) {
      console.log('there was an error in fetchOrders thunk')
    }
  }
}

// INITIAL STATE
const initialState = {
  user: {},
  orders: [],
}

const userHomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
      }
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      }
    case DELETE_USER:
      return {
        ...state,
        user: {},
      }
    case GET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      }
    default:
      return state
  }
}

export default userHomeReducer
