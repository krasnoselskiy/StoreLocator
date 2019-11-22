import { toast } from 'react-toastify';
import axios from 'axios';

const toastConfig = {
  autoClose: 1000
};
export const REQUEST_PLACES = 'REQUEST_PLACES';
export const RECEIVE_PLACES = 'RECEIVE_PLACES';
export const WRONG_ADDRESS = 'WRONG_ADDRESS';
export const CLOSE_MAP_COLUMN = 'CLOSE_MAP_COLUMN';
export const OPEN_MAP_COLUMN = 'OPEN_MAP_COLUMN';
export const REQUEST_PLACES_FROM_DB = 'REQUEST_PLACES_FROM_DB';
export const SAVE_TO_DB_BEGIN = 'SAVE_TO_DB_BEGIN';
export const SAVE_TO_DB_SUCCESS = 'SAVE_TO_DB_SUCCESS';
export const SAVE_TO_DB_ERROR = 'SAVE_TO_DB_ERROR';
export const GET_FROM_DB_BEGIN = 'GET_FROM_DB_BEGIN';
export const GET_FROM_DB_SUCCESS = 'GET_FROM_DB_SUCCESS';
export const GET_FROM_DB_ERROR = 'GET_FROM_DB_ERROR';
export const DELETING_FROM_DB_BEGIN = 'DELETING_FROM_DB_BEGIN';
export const DELETING_FROM_DB_SUCCESS = 'DELETING_FROM_DB_SUCCESS';
export const DELETING_FROM_DB_ERROR = 'DELETING_FROM_DB_ERROR';
export const MAP_RECENTER_BEGIN = 'MAP_RECENTER_BEGIN';
export const MAP_RECENTER_ERROR = 'MAP_RECENTER_ERROR';
export const MAP_RECENTER_SUCCESS = 'MAP_RECENTER_SUCCESS';

export const mapRecenterBegin = (coordinates) => (
  {
    type: MAP_RECENTER_BEGIN,
    coordinates
  }
)

export const mapRecenterSuccess = (action) => {
  return {
    type: MAP_RECENTER_SUCCESS,
    action
  }
}

export const mapRecenterError = (action) => {
  return {
    type: MAP_RECENTER_ERROR,
    action
  }
}

export const deletingToDbBegin = (action) => (
  {
    type: DELETING_FROM_DB_BEGIN,
    action
  }
)

export const deletingToDbSuccess = (action) => {
  toast.success('Deletion from the database was successful!', {
    autoClose: toastConfig.autoClose
  })

  return {
    type: DELETING_FROM_DB_SUCCESS,
    action
  }
}

export const deletingToDbError = (action) => {
  toast.error('Deletion from the database was failed!', {
    autoClose: toastConfig.autoClose
  })

  return {
    type: DELETING_FROM_DB_ERROR,
    action
  }
}

export const savingToDbBegin = (action) => (
  {
    type: SAVE_TO_DB_BEGIN,
    action
  }
)

export const savingToDbSuccess = (action) => {
  toast.success('Saving to database was successfull :)', {
    autoClose: toastConfig.autoClose
  })

  return {
    type: SAVE_TO_DB_SUCCESS,
    action
  }
}

export const savingToDbError = (action) => {
  toast.error('Saving to database was failed!', {
    autoClose: toastConfig.autoClose
  });

  return {
    type: SAVE_TO_DB_ERROR,
    action
  }
}

export const gettingFromDbBegin = (action) => (
  {
    type: GET_FROM_DB_BEGIN,
    action
  }
)

export const gettingFromDbSuccess = (action) => (
  {
    type: GET_FROM_DB_SUCCESS,
    action
  }
)

export const gettingFromDbError = (action) => {
  toast.error('Load from database was failed!', {
    autoClose: toastConfig.autoClose
  });

  return {
    type: GET_FROM_DB_ERROR,
    action
  }
}

export const receivePlaces = (address, places) => (
  {
    type: RECEIVE_PLACES,
    address,
    places
  }
)

export const wrongAddress = (action) => {
  toast.error('Invalid address!', {
    autoClose: toastConfig.autoClose
  });

  return {
    type: WRONG_ADDRESS,
    action
  }
}

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

export const requestPlacesFromDB = address => ({
  type: REQUEST_PLACES_FROM_DB,
  address
})

export const fetchPlaces = address => dispatch => {
  dispatch(requestPlaces(address))
  return fetch(`https://us1.locationiq.com/v1/search.php?key=cfdebe1b287c62&q=${address}&format=json`)
    .then(response => response.json())
    .then(res => {
      if (res.error) {
        return dispatch(wrongAddress(address))
      }
      dispatch(receivePlaces(address, res))
    })
    .catch((e) => {
      dispatch(wrongAddress(address))
    });
}

export const fetchPlacesFromDB = (stores) => dispatch => {
  dispatch(gettingFromDbBegin(null))

  return axios.get(`http://localhost:5000`)
    .then(res => {
      dispatch(gettingFromDbSuccess(null))
      dispatch(receivePlaces(stores, res.data))
      dispatch(openMapColumn())
    })
    .catch(error => {
      dispatch(gettingFromDbError(error))
    });
}

export const saveToDB = (store) => dispatch => {
  dispatch(savingToDbBegin(null))

  return axios.post('http://localhost:5000/create', store, {})
    .then(res => {
      dispatch(savingToDbSuccess(null))
      dispatch(openMapColumn())
    })
    .catch(error => {
      dispatch(gettingFromDbError(error))
    });
}

export const deleteOneFromDb = (id) => dispatch => {
  dispatch(deletingToDbBegin(null))
  return axios.delete(`http://localhost:5000/delete/${id}`)
    .then(res => {
      dispatch(deletingToDbSuccess(null))
      dispatch(fetchPlacesFromDB(null))
    })
    .catch(error => {
      dispatch(deletingToDbError(null))
    });
}



