import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { connect } from 'react-redux'
import { mapRecenterBegin } from '../../redux/actions'
import { yellowIcon, greenIcon } from './MapIcons'
import MapSidebar from './MapSidebar'

import './map.css'

const MapContainer = (props) => {
  const { places, dispatch, coordinates } = props;
  const mapInitPosition = [places[0].lat, places[0].lon];

  const mapSetNewCenter = (lat, lon) => {
    const data = {
      lon,
      lat
    };

    dispatch(mapRecenterBegin(data))
  }

  return (
    <div className="mapContainer mt-5">
      <MapSidebar mapRecenter={mapSetNewCenter} />
      <Map
        center={coordinates ? coordinates : mapInitPosition}
        zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        {places.map((point, index) => {
          const point_position = [point.lat, point.lon]

          return (
            <Marker key={index} position={point_position}>
              <Popup>Doesn't show the text</Popup>
            </Marker>
          );
        })}
      </Map>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    places: state.placesByAdress.places,
    coordinates: state.mapRecenter.coordinates
  }
}

export default connect(mapStateToProps)(MapContainer)
