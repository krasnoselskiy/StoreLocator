const { Router } = require('express')
const Store = require('../models/Store')
const router = Router()

router.get('/', async (req, res) => {
  const stores = await Store.find({})

  res.send(stores);
})

router.post('/create', async (req, res, next) => {
  try {
    if (!req.body.title) {
      throw new Error();
    }
    const store = new Store({
      title: req.body.title,
      lat: req.body.lat,
      lon: req.body.lon,
    })
    await store.save()
    res.sendStatus(200);

  } catch (e) {
    next(e);
  }
})

module.exports = router
