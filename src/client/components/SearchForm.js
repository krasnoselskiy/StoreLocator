import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSVReader from 'react-csv-reader'
import axios from 'axios';

import { fetchPlaces, openMapColumn } from '../redux/actions'

export class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null
    }

    this.handleLoadingFile = this.handleLoadingFile.bind(this);
  }

  handleGettingPlaces = e => {
    e.preventDefault()
    const { dispatch } = this.props
    const event_parent = e.target.parentNode;
    const place_input = event_parent.querySelector(".place-input")
    let address = place_input.value;

    if (address) {
      dispatch(fetchPlaces(address))
      dispatch(openMapColumn())
    }
  }

  handleLoadingFile = e => {
    const file = event.target.files[0];

    this.setState({
      selectedFile: file
    })
  }

  handleCreateJSON = (data) => {
    let json = [];

    function createObj(first, second) {
      const result = {};
      first.forEach((key, i) => {
        let value = second[i].replace(/['"]+/g, '').replace(/\s+/g, '');
        return result[key] = value;
      })
      return result;
    }

    data.map((item, i) => {
      if (i > 0) {
        json.push(createObj(data[0], data[i]))
      }
    })

    console.log(json);
  }

  handleLoadToServerFile = e => {
    const data = new FormData();
    data.append('file', this.state.selectedFile)

    axios.post("http://localhost:5000/upload", data, {})
      .then(res => {
        console.log(res.statusText)
      })
  }

  render() {
    return (
      <div className="row" >
        <div className="form-wrap col-6">
          <form onSubmit={this.handleGettingPlaces} className="form-group">
            <div className="form-group">
              <input className="form-control place-input" type="text" placeholder="Enter store addess" />
            </div>
            <button type="submit" className="btn btn-info"
            >Find address</button>
          </form>
        </div>

        <div className="col-6">
          <CSVReader onFileLoaded={data => this.handleCreateJSON(data)} />
          {this.state.selectedFile ?
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


