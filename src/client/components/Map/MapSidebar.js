import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { closeMapColumn, openMapColumn } from '../../redux/actions'
import MapLineItem from './MapLineItem'

const MapSidebar = ({ places, openMapSidebar, dispatch }) => {

  const handlerMapColumnClose = (e) => {
    dispatch(closeMapColumn())
  }

  const handlerMapColumnOpen = (e) => {
    dispatch(openMapColumn())
  }

  return (
    <div className="map_column_wrap">
      <button className={classNames('btn', 'map_column_icon', 'map_column_open', { show: !openMapSidebar })} onClick={handlerMapColumnOpen}>
        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
      </button>
      <div className={openMapSidebar ? 'column open' : 'column'}>
        <button className="btn map_column_icon map_column_close" onClick={handlerMapColumnClose}>
          <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
        </button>
        {places ? places.map((place, i) =>
          <MapLineItem key={i} title={place.display_name} lat={place.lat} lon={place.lon} />
        ) : null}
      </div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    places: state.placesByAdress.places,
    openMapSidebar: state.mapColumn.openMapSidebar
  }
}

export default connect(mapStateToProps)(MapSidebar)
