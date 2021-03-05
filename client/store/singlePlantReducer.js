import axios from 'axios'

// ACTION TYPE
const SET_PLANT = 'SET_PLANT'

// ACTION CREATOR
export const setPlant = plant => {
  return {
    type: SET_PLANT,
    plant
  }
}

// THUNK
export const fetchPlant = id => {
  return async dispatch => {
    try {
      // console.log('in fetchPlant')
      const {data: plant} = await axios.get(`/api/plants/${id}`)
      // console.log('plant in fetchPlant:', plant)
      dispatch(setPlant(plant))
    } catch (error) {
      console.log('Error in fetching plant')
    }
  }
}

// INITIAL STATE
const initialState = {
  single: {}
}

//REDUCER
const plantReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANT:
      return {
        ...state,
        single: action.plant
      }
    default:
      return state
  }
}

export default plantReducer
