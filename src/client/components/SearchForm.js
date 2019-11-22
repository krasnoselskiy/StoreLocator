import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';

import CsvLoad from './CsvLoad'

import { fetchPlaces, openMapColumn, fetchPlacesFromDB } from '../redux/actions'

export class SearchForm extends Component {
  constructor(props) {
    super(props);
  }

  handleGettingPlaces = e => {
    e.preventDefault()
    const { dispatch } = this.props
    let address = e.target.value;

    if (address) {
      dispatch(fetchPlaces(address))
      dispatch(openMapColumn())
    }
  }

  passStoresToServer = (stores) => {
    this.handleLoadToServerFile(stores)
  }

  handleLoadToServerFile = (stores) => {
    const { dispatch } = this.props

    axios.post("http://localhost:5000/upload", stores, {})
      .then(res => {
        dispatch(fetchPlacesFromDB())
      })
  }

  render() {
    return (
      <div className="row" >
        <div className="form-wrap col-6">
          <form className="form-group">
            <div className="form-group">
              <input className="form-control place-input" type="text" onChange={this.handleGettingPlaces} placeholder="Enter store addess" />
            </div>
          </form>
        </div>

        <CsvLoad passStoresJSON={this.passStoresToServer} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subm: (id) => {
      dispatch(handleGettingPlaces(id))
    }
  }
}

export default connect(
  mapDispatchToProps
)(SearchForm)


