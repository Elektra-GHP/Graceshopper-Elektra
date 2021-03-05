import axios from 'axios'

// ACTION TYPE
const SET_PLANTS = 'SET_PLANTS'

// ACTION CREATOR
export const setPlants = plants => {
  return {
    type: SET_PLANTS,
    plants
  }
}

// THUNK
export const fetchPlants = () => {
  return async dispatch => {
    try {
      const {data: plants} = await axios.get('/api/plants')
      // console.log('plants:', plants)
      dispatch(setPlants(plants))
    } catch (error) {
      console.log('Error in fetching plants')
    }
  }
}

// INITIAL STATE
const initialState = {
  all: []
}

//REDUCER
const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANTS:
      return {
        ...state,
        all: action.plants
      }
    default:
      return state
  }
}

export default plantsReducer
