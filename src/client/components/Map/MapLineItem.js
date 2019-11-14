import React from 'react';

const MapLineItem = (props) => {

  const { title, lat, lon } = props;

  const cutted_title = title.substring(0, 45) + '...'

  const handlerMapItemCLick = (e) => {
    props.mapRecenter(lat, lon)
  }

  return (
    <div className="map_line_item" onClick={handlerMapItemCLick}>
      <span className="title">{cutted_title}</span>
    </div>
  );
}

export default MapLineItem;
