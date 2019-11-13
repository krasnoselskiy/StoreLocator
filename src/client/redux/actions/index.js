export const REQUEST_PLACES = 'REQUEST_PLACES';
export const RECEIVE_PLACES = 'RECEIVE_PLACES';
export const INVALIDATE_ADDRESS = 'INVALIDATE_ADDRESS';
export const CLOSE_MAP_COLUMN = 'CLOSE_MAP_COLUMN';
export const OPEN_MAP_COLUMN = 'OPEN_MAP_COLUMN';
export const REQUEST_PLACES_FROM_DB = 'REQUEST_PLACES_FROM_DB';
export const SAVE_TO_DB_BEGIN = 'SAVE_TO_DB_BEGIN';
export const SAVE_TO_DB_SUCCESS = 'SAVE_TO_DB_SUCCESS';
export const SAVE_TO_DB_ERROR = 'SAVE_TO_DB_ERROR';
export const GET_FROM_DB_BEGIN = 'GET_FROM_DB_BEGIN';
export const GET_FROM_DB_SUCCESS = 'GET_FROM_DB_SUCCESS';
export const GET_FROM_DB_ERROR = 'GET_FROM_DB_ERROR';

export const saveToDbBegin = (action) => (
  {
    type: SAVE_TO_DB_BEGIN,
    action
  }
)

export const saveToDbSuccess = (action) => (
  {
    type: SAVE_TO_DB_SUCCESS,
    action
  }
)

export const saveToDbError = (action) => (
  {
    type: SAVE_TO_DB_ERROR,
    action
  }
)

export const getFromDbBegin = (action) => (
  {
    type: SAVE_TO_DB_BEGIN,
    action
  }
)

export const getFromDbSuccess = (action) => (
  {
    type: GET_FROM_DB_SUCCESS,
    action
  }
)

export const getFromDbError = (action) => (
  {
    type: GET_FROM_DB_ERROR,
    action
  }
)

export const receivePlaces = (address, json) => (
  {
    type: RECEIVE_PLACES,
    address,
    places: json,
    receivedAt: Date.now()
  }
)

export const closeMapColumn = (action) => {
  return {
    type: action_types.CLOSE_MAP_COLUMN,
    action
  }
}

export const openMapColumn = (action) => {
  return {
    type: OPEN_MAP_COLUMN,
    action
  }
}

export const requestPlaces = address => ({
  type: REQUEST_PLACES,
  address
})

export const requestPlacesFromDB = address => ({
  type: REQUEST_PLACES_FROM_DB,
  address
})

export const fetchPlaces = address => dispatch => {
  dispatch(requestPlaces(address))
  return fetch(`https://us1.locationiq.com/v1/search.php?key=cfdebe1b287c62&q=${address}&format=json`)
    .then(response => response.json())
    .then(json => dispatch(receivePlaces(address, json)))
    .catch((e) => { console.log(e) });
}

export const fetchPlacesFromDB = (address) => dispatch => {
  dispatch(requestPlacesFromDB(address))
  return fetch(`http://localhost:5000`)
    .then(response => response.json())
    .then(json => dispatch(receivePlaces(address, json)))
    .catch((e) => { console.log(e) });
}



