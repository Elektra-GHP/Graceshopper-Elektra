import axios from 'axios'

// ACTION TYPE
const SET_PLANTS = 'SET_PLANTS'
const ADD_PLANT = 'ADD_PLANT'
const EDIT_PLANT = 'EDIT_PLANT'
const DELETE_PLANT = 'DELETE_PLANT'

// ACTION CREATOR
export const setPlants = (plants) => {
  return {
    type: SET_PLANTS,
    plants,
  }
}

const addPlantCreator = (plant) => {
  console.log('plant added to state:', plant)
  return {
    type: ADD_PLANT,
    plant,
  }
}

const editPlantCreator = (plant) => {
  return {
    type: EDIT_PLANT,
    plant,
  }
}

const deletePlantCreator = (plant) => {
  return {
    type: DELETE_PLANT,
    plant,
  }
}

// THUNK
export const fetchPlants = () => {
  return async (dispatch) => {
    try {
      const {data: plants} = await axios.get('/api/plants')
      dispatch(setPlants(plants))
    } catch (error) {
      console.log('Error in fetching plants')
    }
  }
}

export const addPlant = (plant) => {
  return async (dispatch) => {
    try {
      console.log('new plant:', plant)
      const {data: newPlant} = await axios.post('/api/plants', plant)
      dispatch(addPlantCreator(newPlant))
    } catch (error) {
      console.log('Error in addPlant thunk')
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

export const deletePlant = (plantId) => {
  return async (dispatch) => {
    try {
      const {data: plant} = await axios.delete(`/api/plants/${plantId}`)
      dispatch(deletePlantCreator(plant))
    } catch (error) {
      console.log('Error in deletePlant thunk')
    }
  }
}

// INITIAL STATE
const initialState = {
  all: [],
}

//REDUCER
const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANTS:
      return {
        ...state,
        all: action.plants,
      }
    case ADD_PLANT:
      return {...state, all: [...state.all, action.plant]}
    case EDIT_PLANT:
      return {
        ...state,
        all: state.all.map((plant) => {
          if (plant.id === action.plant.id) {
            plant.name = action.plant.name
            plant.description = action.plant.description
            plant.inventory = action.plant.inventory
            plant.price = action.plant.price
            plant.light = action.plant.light
            plant.water = action.plant.water
            plant.humidity = action.plant.humidity
          }
          return plant
        }),
      }
    case DELETE_PLANT:
      return {
        ...state,
        all: state.all.filter((plant) => plant.id !== action.plant.id),
      }
    default:
      return state
  }
}

export default plantsReducer
