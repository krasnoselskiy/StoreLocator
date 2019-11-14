import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchPlacesFromDB,
} from '../redux/actions'
import { ToastContainer } from 'react-toastify';

import SearchForm from '../components/SearchForm'
import Places from '../components/Places'
import MapContainer from '../components/Map/MapContainer'

import './app.css'
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  static propTypes = {
    places: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPlacesFromDB(null))
  }

  render() {
    const { isFetching, places, isGetFromAPI } = this.props
    const isEmpty = places.length === 0
    return (
      <div className="container mt-3">
        <h1>Add your store to map</h1>
        <SearchForm />

        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty...</h2>)
          : <div className="wrap">
            <div className="places-wrap">
              <Places places={places} isGetFromAPI={isGetFromAPI} />
            </div>
            <MapContainer />
          </div>
        }
        <ToastContainer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { placesByAdress } = state;

  let isGetFromAPI = false;
  let isFetching = true;
  let places = [];

  if (placesByAdress.places) {
    isFetching = false;
    places = placesByAdress.places;
  }

  if (placesByAdress.isGetFromAPI) {
    isGetFromAPI = true
  }

  return {
    isFetching,
    places,
    isGetFromAPI
  }
}

export default connect(mapStateToProps)(App)
