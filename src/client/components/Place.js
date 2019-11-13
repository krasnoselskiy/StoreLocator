import React from 'react';
import axios from 'axios';

const Place = (props) => {

  const { place } = props;

  const handlerToSavePin = (e) => {
    const data = {
      title: place.display_name,
      lat: place.lat,
      lon: place.lon
    }

    axios.post('http://localhost:5000/create', data, {})
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const place_title = `${place.display_name.substring(0, 125)}...`;

  return (
    <li className="list_item mb-3">
      <div>{place_title}</div>

      <button className="btn btn-info save_button" onClick={handlerToSavePin}>Save</button>
    </li>
  );
}

export default Place;
