import React from 'react';
import { connect } from "react-redux";
import { saveToDB } from '../redux/actions'

const Place = (props) => {
  const { place, dispatch, isGetFromAPI } = props;
  const handlerToSavePin = (e) => {
    const data = {
      display_name: place.display_name,
      lat: place.lat,
      lon: place.lon
    }

    dispatch(saveToDB(data))
  }

  const handlerToDeletePin = (e) => {
    const id = place._id;
  }

  const place_title = `${place.display_name.substring(0, 125)}...`;

  return (
    <li className="list_item mb-4">
      <div>{place_title}</div>

      {isGetFromAPI ?
        <button className="btn btn-info save_button" onClick={handlerToSavePin}>Save</button> :
        <button className="btn btn-danger save_button" onClick={handlerToDeletePin}>Delete</button>
      }
    </li>
  );
}

const mapStateToProps = state => {
  return {

  };
}

export default connect(mapStateToProps)(Place);
