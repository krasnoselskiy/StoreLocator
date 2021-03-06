const { Router } = require('express')
const multer = require('multer')
const Store = require('../models/Store')
const router = Router()
const csv = require('csv-parser')
const fs = require('fs')

router.get('/', async (req, res) => {
  const stores = await Store.find({})
  res.send(stores);
})

router.post('/create', async (req, res, next) => {
  try {
    if (!req.body.display_name) {
      throw new Error();
    }
    const store = new Store({
      display_name: req.body.display_name,
      lat: req.body.lat,
      lon: req.body.lon
    })
    await store.save()
    res.sendStatus(200);

  } catch (e) {
    next(e);
  }
})

router.post('/upload', (req, res, next) => {
  try {
    if (!req.body.length || !req.body[0].address.length || !req.body[0].latitude.length || !req.body[0].longitude.length) {
      throw new Error();
    }

    let length = req.body.length;

    req.body.forEach(function (store, index) {
      checkEndSave(store, finishCb)
    });

    function finishCb() {
      length--;
      if (length == 0) {
        res.sendStatus(200);
      }
    }

    function checkEndSave(store) {
      Store.find({ lat: store.latitude }, async (err, docs, next) => {
        if (!docs.length) {
          let store_item = new Store({
            display_name: store.address,
            lat: store.latitude,
            lon: store.longitude
          })
          await store_item.save();
          finishCb()

        } else {
          // next(new Error("User exists!"));
        }
      });
    }
  } catch (e) {
    next(e);
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error();
    }

    Store.findByIdAndDelete(req.params.id, function (err) {
      if (err) console.log(err);
      res.sendStatus(200);
    });

  } catch (e) {
    next(e);
  }
})

module.exports = router
