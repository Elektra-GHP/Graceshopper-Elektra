import axios from 'axios'

// ACTION TYPES
const SET_PLANT = 'SET_PLANT'
const EDIT_PLANT = 'EDIT_PLANT'

// ACTION CREATORS
export const setPlant = (plant) => {
  return {
    type: SET_PLANT,
    plant,
  }
}

const editPlantCreator = (plant) => {
  return {
    type: EDIT_PLANT,
    plant,
  }
}

// THUNKS
export const fetchPlant = (id) => {
  return async (dispatch) => {
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

export const editPlant = (plantId, plant) => {
  return async (dispatch) => {
    try {
      const {data: editedPlant} = await axios.put(
        `/api/plants/${plantId}`,
        plant
      )
      dispatch(editPlantCreator(editedPlant))
    } catch (error) {
      console.log('Error in editPlant thunk')
    }
  }
}

// INITIAL STATE
const initialState = {
  single: {},
}

//REDUCER
const plantReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANT:
      return {
        ...state,
        single: action.plant,
      }
    case EDIT_PLANT:
      return {...state, single: action.plant}
    default:
      return state
  }
}

export default plantReducer
