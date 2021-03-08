import axios from 'axios'

// ACTION TYPE
const GET_CART = 'GET_CART'
const ADD_PLANT_TO_CART = 'ADD_PLANT_TO_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'

// ACTION CREATOR
export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const addPlantToCart = cart => {
  return {
    type: ADD_PLANT_TO_CART,
    cart
  }
}

export const removeItem = cart => {
  return {
    type: DELETE_ITEM,
    cart
  }
}

export const editQuant = cart => {
  return {
    type: EDIT_QUANTITY,
    cart
  }
}

// THUNK
export const fetchCart = userId => {
  return async dispatch => {
    try {
      //const {data: cart} = await axios.get(`/api/users/${userId}/cart`)
      const {data: cart} = await axios.get(`/api/carts/user/${userId}`)
      dispatch(getCart(cart))
    } catch (error) {
      console.log("Problem getting user's cart")
    }
  }
}

//updating the cart
export const addPlant = (userId, plantId) => {
  return async dispatch => {
    try {
      /*
      const {data: cart} = await axios.post(`/api/users/${userId}/cart`, {
        plantId,
        quantity: 1
      })
      */
      const {data: cart} = await axios.post(`/api/carts/user/${userId}`, {
        plantId,
        quantity: 1
      })
      console.log('IMPORTANT CART -->', cart)
      dispatch(addPlantToCart(cart))
    } catch (error) {
      console.log('Problem adding plant')
    }
  }
}

export const deleteItem = (userId, plantId) => {
  return async dispatch => {
    try {
      //console.log('delete thunk plantId----->', plantId)
      /*
      const {data: newCart} = await axios.delete(`api/users/${userId}/cart`, {
        data: {plantId}
      })
      */
      const {data: newCart} = await axios.delete(`/api/carts/user/${userId}`, {
        data: {plantId}
      })
      dispatch(removeItem(newCart))
    } catch (error) {
      console.log('Cannot delete item')
    }
  }
}

export const editQuantity = (userId, plantId, newQuant) => {
  return async dispatch => {
    try {
      /*
      console.log('plantId in editQuantity Thunk -->', plantId)
      const {data: newCart} = await axios.put(`api/users/${userId}/cart`, {
        data: {plantId},
        plantId,
        quantity: newQuant
      })
      */
      const {data: newCart} = await axios.put(`/api/carts/user/${userId}`, {
        data: {plantId},
        plantId,
        quantity: newQuant
      })
      console.log('newCart in edit quantity thunk ---> ', newCart)
      dispatch(editQuant(newCart))
    } catch (err) {
      console.log('Error in Editing Quantity Thunk')
    }
  }
}

//initial state
const initialState = []

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_PLANT_TO_CART:
      return action.cart
    case DELETE_ITEM:
      return action.cart
    case EDIT_QUANTITY:
      return action.cart
    default:
      return state
  }
}
