const { Router } = require('express')
const Store = require('../models/Store')
const router = Router()

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

router.delete('/stores/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error();
    }

    Store.findByIdAndDelete(req.params.id, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
      res.sendStatus(200);
    });

  } catch (e) {
    next(e);
  }
})

module.exports = router
