import React from 'react'
import PropTypes from 'prop-types'

const Places = ({ places }) => {

  const handlerToSavePin = (e) => {
    console.log(e);
  }

  return (
    <ul>
      {places ? places.map((place, i) =>
        <li key={i} className="list_item">
          <div>{place.display_name}</div>
          <div>{place.lat}</div>
          <div>{place.lon}</div>

          <button className="btn btn-info save_button" onClick={handlerToSavePin}>Save</button>
        </li>
      ) : null}
    </ul>
  )
}

Places.propTypes = {
  places: PropTypes.array.isRequired
}

export default Places

