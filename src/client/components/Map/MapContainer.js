import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { connect } from 'react-redux'

import MapSidebar from './MapSidebar'

import './map.css'

const MapContainer = ({ places }) => {
  const mapInitPosition = [];
  mapInitPosition.push(places[0].lat, places[0].lon)

  return (
    <div className="mapContainer mt-5">
      <MapSidebar />
      <Map center={mapInitPosition} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        {places.map((point, index) => {
          const point_position = []
          const lat = point.lat;
          const lon = point.lon;

          point_position.push(lat, lon)

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
    places: state.placesByAdress.places
  }
}

export default connect(mapStateToProps)(MapContainer)
