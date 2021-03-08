import axios from 'axios'

// ACTION TYPES
const SET_TYPES = 'SET_TYPES'
const SINGLE_TYPE = 'SINGLE_TYPE'

// ACION CREATORS
const setTypes = (types) => {
  return {
    type: SET_TYPES,
    types,
  }
}

export const singleType = (plantType) => {
  return {
    type: SINGLE_TYPE,
    plantType,
  }
}

// THUNK CREATORS
export const getTypes = () => {
  return async (dispatch) => {
    try {
      const {data: types} = await axios.get('/api/plants/types')
      dispatch(setTypes(types))
    } catch (error) {
      console.log('there was an error in getTypes thunk')
    }
  }
}

export const getSingleType = (typeId) => {
  console.log('before return in thunk')
  return async (dispatch) => {
    try {
      const {data: type} = await axios.get(`/api/plants/types/${typeId}`)
      console.log('inside thunk---> type', type)
      dispatch(singleType(type))
    } catch (error) {
      console.log('Problem getting single type of plant')
    }
  }
}

const initialState = {
  all: [],
  singleType: {},
}

// REDUCER
const typesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPES:
      return {...state, all: action.types}
    case SINGLE_TYPE:
      return {...state, singleType: action.plantType}
    default:
      return state
  }
}

export default typesReducer
