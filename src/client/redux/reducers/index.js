import { combineReducers } from 'redux'
import {
  REQUEST_PLACES, RECEIVE_PLACES, INVALIDATE_ADDRESS
} from '../actions'

const places = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_ADDRESS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_PLACES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_PLACES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        places: action.places,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsBySubreddit = (state = {}, action) => {
  return state
}

const placesByAdress = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_ADDRESS:
      return {
        ...state,
        isFetching: false,
        wrongAddress: true,
        places: []
      }
    case RECEIVE_PLACES:
      return {
        ...state,
        isFetching: false,
        places: action.places
      }
    case REQUEST_PLACES:
      return state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  placesByAdress
})

export default rootReducer
