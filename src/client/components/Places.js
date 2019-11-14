import React from 'react'
import Place from './Place'

const Places = ({ places, isGetFromAPI }) => {
  return (
    <ul>
      {places.length ? places.map((place, i) =>
        <Place key={i} place={place} isGetFromAPI={isGetFromAPI} />
      ) : null}
    </ul>
  )
}

export default Places

