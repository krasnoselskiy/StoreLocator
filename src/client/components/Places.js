import React from 'react'
import PropTypes from 'prop-types'

const Places = ({ places }) => (
  <ul>
    {places ? places.map((place, i) =>
      <li key={i}>
        <div>{place.display_name}</div>
        <div>{place.lat}</div>
        <div>{place.lon}</div>
      </li>
    ) : null}
  </ul>
)

Places.propTypes = {
  places: PropTypes.array.isRequired
}

export default Places

