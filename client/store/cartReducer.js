import axios from 'axios'

// ACTION TYPE
const GET_CART = 'GET_CART'
const ADD_PLANT_TO_CART = 'ADD_PLANT_TO_CART'
const DELETE_ITEM = 'DELETE_ITEM'

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

// THUNK
export const fetchCart = userId => {
  return async dispatch => {
    try {
      const {data: cart} = await axios.get(`/api/users/${userId}/cart`)
      //console.log('CART IN CART REDUCER THUNK ---> ', cart)
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
      const {data: cart} = await axios.post(`/api/users/${userId}/cart`, {
        plantId,
        quantity: 1
      })
      console.log('CART IN CART REDUCER THUNK ---> ', cart)

      dispatch(addPlantToCart(cart))
    } catch (error) {
      console.log('Problem adding plant')
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
    default:
      return state
  }
}
