import axios from 'axios'

// ACTION TYPE
const GET_CART = 'GET_CART'
const ADD_PLANT_TO_CART = 'ADD_PLANT_TO_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'
const CHECKOUT_CART = 'CHECKOUT_CART'
// guest
const ADD_PLANT_GUEST = 'ADD_PLANT_GUEST'
const EDIT_QUANTITY_GUEST = 'EDIT_QUANTITY_GUEST'
const DELETE_ITEM_GUEST = 'DELETE_ITEM_GUEST'
const CHECKOUT_GUEST = 'CHECKOUT_GUEST'

// ACTION CREATOR
const getCart = (cart) => ({
  type: GET_CART,
  cart,
})

const addPlantToCart = (cart) => {
  return {
    type: ADD_PLANT_TO_CART,
    cart,
  }
}

// guest
export const addPlantGuest = (plant) => {
  plant.item = {
    quantity: 1,
    cartId: null,
    plantId: plant.id,
  }
  return {
    type: ADD_PLANT_GUEST,
    plant,
  }
}

const removeItem = (cart) => {
  return {
    type: DELETE_ITEM,
    cart,
  }
}

export const removeItemGuest = (plantId) => {
  return {
    type: DELETE_ITEM_GUEST,
    plantId,
  }
}

const editQuant = (cart) => {
  return {
    type: EDIT_QUANTITY,
    cart,
  }
}

export const editQuantGuest = (plant, newQuant) => {
  plant.item.quantity = newQuant
  return {
    type: EDIT_QUANTITY_GUEST,
    plant,
  }
}

const checkoutCart = () => {
  console.log('in checkoutCart action creator')
  return {
    type: CHECKOUT_CART,
  }
}

const checkoutGuest = () => {
  return {
    type: CHECKOUT_GUEST,
  }
}

// THUNK
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      console.log('in fetch cart thunk, userId:', userId)
      const {data: cart} = await axios.get(`/api/carts/user/${userId}`)
      console.log('cart data in fetchCart thunk:', cart)
      dispatch(getCart(cart))
    } catch (error) {
      console.log("Problem getting user's cart")
    }
  }
}

//updating the cart
export const addPlant = (userId, plantId) => {
  return async (dispatch) => {
    try {
      const {data: cart} = await axios.post(`/api/carts/user/${userId}`, {
        plantId,
        quantity: 1,
      })
      dispatch(addPlantToCart(cart))
    } catch (error) {
      console.log('Problem adding plant')
    }
  }
}

export const deleteItem = (userId, plantId) => {
  return async (dispatch) => {
    try {
      const {data: newCart} = await axios.delete(`/api/carts/user/${userId}`, {
        data: {plantId},
      })
      dispatch(removeItem(newCart))
    } catch (error) {
      console.log('Cannot delete item')
    }
  }
}

export const editQuantity = (userId, plantId, newQuant) => {
  return async (dispatch) => {
    try {
      const {data: newCart} = await axios.put(`/api/carts/user/${userId}`, {
        data: {plantId},
        plantId,
        quantity: newQuant,
      })
      console.log('newCart in edit quantity thunk ---> ', newCart)
      dispatch(editQuant(newCart))
    } catch (err) {
      console.log('Error in Editing Quantity Thunk')
    }
  }
}

export const checkout = (userId, shippingAddress) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/checkout/user/${userId}`, {shippingAddress})
      dispatch(checkoutCart())
    } catch (error) {
      console.log('Error in checkout thunk.')
    }
  }
}

export const guestCheckout = (cart, shippingAddress) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/checkout/guest`, {cart, shippingAddress})
      dispatch(checkoutGuest())
    } catch (error) {
      console.log('Error in guestCheckout thunk.')
    }
  }
}

//initial state
const initialState = []


// since most of your actions overwrite the cart, why don't you reduce the number of action types and call GET_CART from each of your thunks which result in a new cart?

//reducer
export default function (state = initialState, action) {
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
      return initialState
    case ADD_PLANT_GUEST:
      return [...state, action.plant]
    case EDIT_QUANTITY_GUEST:
      return state.map((plant) => {
        if (plant.id === action.plant.id) {
          return action.plant
        } else {
          return plant
        }
      })
    case DELETE_ITEM_GUEST:
      return state.filter((plant) => plant.id !== action.plantId)
    case CHECKOUT_GUEST:
      return initialState
    default:
      return state
  }
}
