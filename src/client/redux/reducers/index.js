import { combineReducers } from 'redux'
import {
  REQUEST_PLACES,
  RECEIVE_PLACES,
  INVALIDATE_ADDRESS,
  CLOSE_MAP_COLUMN,
  OPEN_MAP_COLUMN,
  SAVE_TO_DB_BEGIN,
  SAVE_TO_DB_SUCCESS,
  SAVE_TO_DB_ERROR,
  GET_FROM_DB_BEGIN,
  GET_FROM_DB_SUCCESS,
  GET_FROM_DB_ERROR,
  DELETING_FROM_DB_BEGIN,
  DELETING_FROM_DB_SUCCESS,
  DELETING_FROM_DB_ERROR
} from '../actions'

const places = (state = {}, action) => {
  switch (action.type) {
    case INVALID_ADDRESS:
      return {
        ...state,
        isFetching: false,
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
      return {
        ...state,
        isGetFromAPI: true
      }
    default:
      return state
  }
}

const saveToDb = (state = {}, action) => {
  switch (action.type) {
    case SAVE_TO_DB_BEGIN:
      return {
        ...state,
        isSaving: true,
        isSaved: false,
        hasError: false,
        success: false
      }
    case SAVE_TO_DB_SUCCESS:
      return {
        ...state,
        isSaving: false,
        isSaved: false,
        hasError: false,
        success: true
      }
    case SAVE_TO_DB_ERROR:
      return {
        ...state,
        isSaving: false,
        isSaved: false,
        hasError: true,
        success: false
      }
    default:
      return state
  }
}

const getFromDb = (state = {}, action) => {
  switch (action.type) {
    case GET_FROM_DB_BEGIN:
      return {
        ...state,
        isGetting: true,
        isRecieved: false,
        isHasError: false
      }
    case GET_FROM_DB_SUCCESS:
      return {
        ...state,
        isGetting: false,
        isRecieved: true,
        isHasError: false
      }
    case GET_FROM_DB_ERROR:
      return {
        ...state,
        isSavingToDB: false,
        isRecieved: false,
        isHasError: true
      }
    default:
      return state
  }
}

const deleteOneFromDb = (state = {}, action) => {
  switch (action.type) {
    case DELETING_FROM_DB_BEGIN:
      return {
        ...state,
        isDeletingOneBegin: true,
        isDeletedOne: false,
        isHasError: false
      }
    case DELETING_FROM_DB_SUCCESS:
      return {
        ...state,
        isDeletingOneBegin: false,
        isDeletedOne: true,
        isHasError: false
      }
    case DELETING_FROM_DB_ERROR:
      return {
        ...state,
        isDeletingOneBegin: false,
        isDeletedOne: false,
        isHasError: true
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  placesByAdress,
  mapColumn,
  saveToDb,
  getFromDb,
  deleteOneFromDb
})

export default rootReducer
