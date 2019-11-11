import { combineReducers } from 'redux'
import {
  REQUEST_PLACES, RECEIVE_PLACES, INVALIDATE_ADDRESS, CLOSE_MAP_COLUMN, OPEN_MAP_COLUMN
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
        mapColumn: true,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsBySubreddit = (state = {}, action) => {
  return state
}

const mapColumn = (state = {}, action) => {
  switch (action.type) {
    case CLOSE_MAP_COLUMN:
      return {
        ...state,
        openMapSidebar: false,
      }
    case OPEN_MAP_COLUMN:
      return {
        ...state,
        openMapSidebar: true,
      }
    default:
      return state
  }
}

const placesByAdress = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_ADDRESS:
      return {
        ...state,
        isFetching: false,
        wrongAddress: true,
        openMapSidebar: false,
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
  // postsBySubreddit,
  placesByAdress,
  mapColumn
})

export default rootReducer
