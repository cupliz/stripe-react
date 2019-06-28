const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_OQfPWWarHdk85J13RAJj4CfI00Nh8ambn4");

router.get('/', function(req, res, next) {
  res.send('API');
});

router.get('/trans', async function(req, res, next) {
  const {data} = await stripe.charges.list({ limit: 5 });
  res.json(data)
});

router.post('/charge', async function(req, res, next) {
  const {source, amount} = req.body
  try {
    let {id, status} = await stripe.charges.create({
      amount,
      currency: "usd",
      description: "An example charge",
      source
    });
    res.json({id, status});
  } catch (err) {
    res.status(500).end();
  }
});


module.exports = router;
