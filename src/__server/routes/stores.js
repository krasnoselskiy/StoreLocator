const { Router } = require('express')
const multer = require('multer')
const Store = require('../models/Store')
const router = Router()
const csv = require('csv-parser')
const fs = require('fs')

const results = [];

// fs.createReadStream('2.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     console.log(results);
//     Store.insertMany(results, function (error, docs) { });
//   });

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

router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
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
