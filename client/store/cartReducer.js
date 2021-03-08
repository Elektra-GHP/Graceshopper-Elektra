import axios from 'axios'

// ACTION TYPE
const GET_CART = 'GET_CART'
const ADD_PLANT_TO_CART = 'ADD_PLANT_TO_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'
const CHECKOUT_CART = 'CHECKOUT_CART'
// guest
const ADD_PLANT_GUEST = 'ADD_PLANT_GUEST'

// ACTION CREATOR
const getCart = cart => ({
  type: GET_CART,
  cart
})

const addPlantToCart = cart => {
  return {
    type: ADD_PLANT_TO_CART,
    cart
  }
}

// guest
export const addPlantGuest = plant => {
  plant.item = {
    quantity: 1,
    cartId: null,
    plantId: plant.id
  }
  return {
    type: ADD_PLANT_GUEST,
    plant
  }
}

const removeItem = cart => {
  return {
    type: DELETE_ITEM,
    cart
  }
}

const editQuant = cart => {
  return {
    type: EDIT_QUANTITY,
    cart
  }
}

const checkoutCart = () => {
  console.log('in checkoutCart action creator')
  return {
    type: CHECKOUT_CART
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
        quantity: 1,
      })
      */
      const {data: cart} = await axios.post(`/api/carts/user/${userId}`, {
        plantId,
        quantity: 1
      })
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
        data: {plantId},
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
        quantity: newQuant,
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

export const checkout = (userId, shippingAddress) => {
  return async dispatch => {
    try {
      console.log('in checkout thunk')
      console.log(`userId: ${userId}, address: ${shippingAddress}`)
      await axios.put(`api/users/${userId}/checkout`, {})
      console.log('sent axios put request')
      dispatch(checkoutCart())
    } catch (error) {
      console.log('Error in checkout thunk.')
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
    case CHECKOUT_CART:
      console.log('in CHECKOUT_CART reducer')
      return initialState
    case ADD_PLANT_GUEST:
      return [...state, action.plant]
    default:
      return state
  }
}
