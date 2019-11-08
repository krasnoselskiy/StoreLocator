export const REQUEST_PLACES = 'REQUEST_PLACES'
export const RECEIVE_PLACES = 'RECEIVE_PLACES'
export const INVALIDATE_ADDRESS = 'INVALIDATE_ADDRESS'

export const receivePlaces = (address, json) => (
  {
    type: RECEIVE_PLACES,
    address,
    places: json,
    receivedAt: Date.now()
  }
)

export const requestPlaces = address => ({
  type: REQUEST_PLACES,
  address
})

export const fetchPlaces = address => dispatch => {
  dispatch(requestPlaces(address))
  return fetch(`https://us1.locationiq.com/v1/search.php?key=cfdebe1b287c62&q=${address}&format=json`)
    .then(response => response.json())
    .then(json => dispatch(receivePlaces(address, json)))
}


