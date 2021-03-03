import axios from 'axios'

// ACTION TYPE
const BUY_PLANT = 'BUY_PLANT'

// ACTION CREATOR
export const buyPlant = plant => {
  return {
    type: BUY_PLANT,
    plant
  }
}

// THUNK
export const selectedPlant = id => {
  return async dispatch => {
    try {
      const {data: plant} = await axios.get()
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
    case BUY_PLANT:
      return {
        ...state
      }
    default:
      return state
  }
}
