import React from 'react'
import PropTypes from 'prop-types'

import Place from './Place'

const Places = ({ places }) => {
  return (
    <ul>
      {places ? places.map((place, i) =>
        <Place key={i} place={place} />
      ) : null}
    </ul>
  )
}

Places.propTypes = {
  places: PropTypes.array.isRequired
}

export default Places

