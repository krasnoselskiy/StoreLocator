import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPlaces } from '../redux/actions'

export class SearchForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPlaces('empire state building'))
  }

  handleGettingPlaces = e => {
    e.preventDefault()
    const { dispatch } = this.props
    const event_parent = e.target.parentNode;
    const place_input = event_parent.querySelector(".place-input")
    let address = place_input.value;

    if (address) {
      dispatch(fetchPlaces(address))
    }

  }

  render() {
    return (
      <div className="form-group">
        <input className="form-control place-input" type="text" placeholder="Enter your place" />
        <button type="submit" className="btn btn-info mt-3"
          onClick={this.handleGettingPlaces}>Add a place</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(handleGettingPlaces(id))
    }
  }
}

export default connect(
  mapDispatchToProps
)(SearchForm)

