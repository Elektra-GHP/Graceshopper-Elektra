import axios from 'axios'

// ACTION TYPE
const GET_CART = 'GET_CART'
const ADD_PLANT_TO_CART = 'ADD_PLANT_TO_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'
const CHECKOUT_CART = 'CHECKOUT_CART'
const CONFIRMED_CART = 'CONFIRMED_CART'
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

const getConfirmedOrder = (order) => {
  return {
    type: CONFIRMED_CART,
    order,
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
  return {
    type: CHECKOUT_CART,
  }
}

const checkoutGuest = () => {
  console.log('in checkoutGuest action creator')
  return {
    type: CHECKOUT_GUEST,
  }
}

// THUNK
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const {data: cart} = await axios.get(`/api/carts/user/${userId}`)
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
      dispatch(editQuant(newCart))
    } catch (err) {
      console.log('Error in Editing Quantity Thunk')
    }
  }
}

export const checkout = (userId, history, shippingAddress) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/checkout/user/${userId}`, {shippingAddress})
      dispatch(checkoutCart())
      history.push('/orderConfirmation')
    } catch (error) {
      console.log('Error in checkout thunk.')
    }
  }
}

export const guestCheckout = (cart, history, shippingAddress) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/checkout/guest`, {cart, shippingAddress})
      dispatch(checkoutGuest())
      history.push('/orderConfirmation')
    } catch (error) {
      console.log('Error in guestCheckout thunk.')
    }
  }
}

export const fetchConfirmedCart = (userId) => {
  return async (dispatch) => {
    try {
      console.log('in fetchConfirmedCart thunk')
      const {data: order} = await axios.get(
        `/api/carts/user/${userId}/confirmed`
      )
      console.log('cart from thunk:', order)
      dispatch(getConfirmedOrder(order))
    } catch (error) {
      console.log('Error in fetchConfirmedCart thunk.')
    }
  }
}

//initial state
const initialState = {
  active: [],
  order: {},
}

//reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        active: action.cart,
      }
    case ADD_PLANT_TO_CART:
      return {
        ...state,
        active: action.cart,
      }
    case DELETE_ITEM:
      return {
        ...state,
        active: action.cart,
      }
    case EDIT_QUANTITY:
      return {
        ...state,
        active: action.cart,
      }
    case CHECKOUT_CART:
      return {
        ...state,
        active: initialState.active,
      }
    case ADD_PLANT_GUEST:
      return {
        ...state,
        active: [...state.active, action.plant],
      }
    case EDIT_QUANTITY_GUEST:
      return {
        ...state,
        active: state.active.map((plant) => {
          if (plant.id === action.plant.id) {
            return action.plant
          } else {
            return plant
          }
        }),
      }
    case DELETE_ITEM_GUEST:
      return {
        ...state,
        active: state.active.filter((plant) => plant.id !== action.plantId),
      }
    case CHECKOUT_GUEST:
      return {
        ...state,
        active: initialState.active,
      }
    case CONFIRMED_CART:
      return {
        ...state,
        order: action.order,
      }
    default:
      return state
  }
}
