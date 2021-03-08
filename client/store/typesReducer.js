import axios from 'axios'

// ACTION TYPES
const SET_TYPES = 'SET_TYPES'

// ACION CREATORS
const setTypes = (types) => {
  return {
    type: SET_TYPES,
    types,
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

const initialState = {
  all: [],
}

// REDUCER
const typesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPES:
      return {...state, all: action.types}
    default:
      return state
  }
}

export default typesReducer
