export const REQUEST_PLACES = 'REQUEST_PLACES'
export const RECEIVE_PLACES = 'RECEIVE_PLACES'
export const INVALIDATE_ADDRESS = 'INVALIDATE_ADDRESS'
export const CLOSE_MAP_COLUMN = 'CLOSE_MAP_COLUMN'
export const OPEN_MAP_COLUMN = 'OPEN_MAP_COLUMN'

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
    type: CLOSE_MAP_COLUMN,
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

export const fetchPlaces = address => dispatch => {
  dispatch(requestPlaces(address))
  return fetch(`https://us1.locationiq.com/v1/search.php?key=cfdebe1b287c62&q=${address}&format=json`)
    .then(response => response.json())
    .then(json => dispatch(receivePlaces(address, json)))
    .catch((e) => { console.log(e) });
}


