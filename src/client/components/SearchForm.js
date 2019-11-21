import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSVReader from 'react-csv-reader'
import axios from 'axios';

import { fetchPlaces, openMapColumn, fetchPlacesFromDB } from '../redux/actions'

export class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: []
    }
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

  createObj = (first, second) => {
    const result = {};

    first.forEach((key, i) => {
      key = key.replace(/ /g, '');
      let value = second[i];
      return result[key] = value;
    })

    return result;
  }

  handleCreateJSON = (data) => {
    let json = [];

    data.map((item, i) => {
      if (i > 0 && item[0].length) {
        json.push(this.createObj(data[0], data[i]))
      }
    })

    this.setState({
      stores: json
    })
  }

  handleLoadToServerFile = e => {
    const { dispatch } = this.props
    const data = this.state.stores;

    axios.post("http://localhost:5000/upload", data, {})
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

        <div className="col-6">
          <CSVReader onFileLoaded={data => this.handleCreateJSON(data)} />
          {this.state.stores.length ?
            <div className="form-group">
              <button type="button" className="btn btn-info btn-block" onClick={this.handleLoadToServerFile}>Upload</button>
            </div> : null}
        </div>
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


