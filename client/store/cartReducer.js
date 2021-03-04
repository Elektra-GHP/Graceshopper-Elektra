import axios from 'axios'

// ACTION TYPE
const GET_CART = 'GET_CART'
const BUY_PLANT = 'BUY_PLANT'

// ACTION CREATOR
export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const buyPlant = plant => {
  return {
    type: BUY_PLANT,
    plant
  }
}

// THUNK
export const fetchCart = userId => {
  return async dispatch => {
    try {
      const {data: cart} = await axios.get(`/api/user/${userId}/cart`)
      dispatch(getCart(cart))
    } catch (error) {
      console.log("Problem getting user's cart")
    }
  }
}

export const selectedPlant = (plantId, userId, cartId) => {
  return async dispatch => {
    try {
      const {data: plant} = await axios.post(`/api/user/${userId}/cart`, {
        plantId,
        cartId,
        quantity: 1
      })
      dispatch(buyPlant(plant))
    } catch (error) {
      console.log('Problem adding plant')
    }
  }
}
//initial state
const initialState = {}
//reducer
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.cart
      }
    case BUY_PLANT:
      return {
        ...state
      }
    default:
      return state
  }
}
