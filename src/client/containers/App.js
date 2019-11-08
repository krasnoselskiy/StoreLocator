import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPlaces } from '../redux/actions'

import SearchForm from '../components/SearchForm'
import Places from '../components/Places'
import MapContainer from '../components/Map/MapContainer'

import './app.css'

class App extends Component {
  static propTypes = {
    places: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPlaces('empire state building'))
  }

  componentDidUpdate(prevProps) {

  }

  handleChange = nextSubreddit => {
    this.props.dispatch(selectSubreddit(nextSubreddit))
  }

  render() {
    const { isFetching, places } = this.props
    const isEmpty = places.length === 0
    return (
      <div className="container mt-3">
        <h1>Add your place to map</h1>
        <SearchForm />

        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div className="places-wrap" style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Places places={places} />
          </div>
        }

        <MapContainer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { placesByAdress } = state;
  let isFetching = true;
  let places = [];

  if (placesByAdress.places) {
    isFetching = false;
    places = placesByAdress.places;
  }

  return {
    isFetching,
    places
  }
}

export default connect(mapStateToProps)(App)
