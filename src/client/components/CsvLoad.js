import React, { useState } from 'react';
import CSVReader from 'react-csv-reader'
import { toast } from 'react-toastify';

const toastConfig = {
  autoClose: 5000
};

const CsvLoad = (props) => {
  const [stores, setStores] = useState([]);

  const handleCreateJSON = (data) => {
    let stores = [];

    validateFile(data[0])

    data.map((item, i) => {
      if (i > 0 && item[0].length) {
        stores.push(createObj(data[0], data[i]))
      }
    })

    setStores(stores);
  }

  const validateFile = (data) => {
    if (!data[0].toLowerCase().includes("address")) {
      toast.error('The first column of the file must contain the address of store and be called "address"', {
        autoClose: toastConfig.autoClose
      });
      return null;
    } else if (!data[1].toLowerCase().includes("lat")) {
      toast.error('The first column of the file must contain the store of lattitude coordinate and be called "lat"', {
        autoClose: toastConfig.autoClose
      });
      return null;
    } else if (!data[2].toLowerCase().includes("lon")) {
      toast.error('The first column of the file must contain the store of longitude coordinate and be called "lon"', {
        autoClose: toastConfig.autoClose
      });
      return null;
    }
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
