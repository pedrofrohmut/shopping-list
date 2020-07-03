import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types"

const INITIAL_STATE = {
  message: {},
  status: null,
  id: null
}

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        message: {},
        status: null,
        id: null
      }
    default:
      return {
        ...state
      }
  }
}

export default errorReducer
