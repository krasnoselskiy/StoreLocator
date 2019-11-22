import React, { useState } from 'react';
import CSVReader from 'react-csv-reader'

const CsvLoad = (props) => {
  const [stores, setStores] = useState([]);

  const handleCreateJSON = (data) => {
    let stores = [];

    data.map((item, i) => {
      if (i > 0 && item[0].length) {
        stores.push(createObj(data[0], data[i]))
      }
    })

    setStores(stores);
  }

  const createObj = (first, second) => {
    const result = {};

    first.forEach((key, i) => {
      key = key.replace(/ /g, '');
      let value = second[i];
      return result[key] = value;
    })

    return result;
  }

  return (
    <div className="col-6">
      <CSVReader onFileLoaded={data => handleCreateJSON(data)} />
      {stores.length ?
        <div className="form-group">
          <button type="button" className="btn btn-info btn-block" onClick={() => props.passStoresJSON(stores)}>Upload</button>
        </div> : null}
    </div>
  );
}

export default CsvLoad;
