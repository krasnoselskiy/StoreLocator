import React from 'react';

const MapLineItem = ({ title, lat, lon }) => {

  const cutted_title = title.substring(0, 45) + '...'

  const handlerMapItemCLick = (e) => {
    console.log(e.target.dataset.lat, e.target.dataset.lon);
  }

  return (
    <div className="map_line_item" data-lat={lat} data-lon={lon} onClick={handlerMapItemCLick}>
      <span className="title">{cutted_title}</span>
    </div>
  );
}

export default MapLineItem;
