const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const stripe = require('stripe')('sk_test_etslWeuOUVx1Ygpq2MeTSGCG007zTS3tyD'); //Comment out api key before putting on github

const router = express.Router();
const Restaurant = mongoose.model('restaurant'); //Add same for menu if working
const Menu = mongoose.model('menu');
const ShoppingCart = mongoose.model('shoppingCart');


curUID = ""

router.get('/', (req, res) => {
  res.render('form', { title: 'Input form' });
  curUID = Math.floor(Math.random() * Math.floor(9999));
  console.log(curUID)
});

router.post('/restaurants',
  (req, res) => {
    //console.log(req.body.deliveryInput, req.body.addressInput);
    Restaurant.find({ $or: [{ "Name": req.body.deliveryInput }, { "Location": req.body.addressInput }, { "MainFood": req.body.deliveryInput }, { "City.Zipcode": parseInt(req.body.addressInput) }] })
      .then((restaurants) => {
        res.render('restaurants', { title: 'Listing stores', restaurants });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
  });

router.post('/menu',
  (req, res) => {
    Menu.find({ "Store": req.body.restName })
      .then((menu) => {
        res.render('menu', { title: 'Listing options', menu });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
  });

router.post('/sendorder',
  (req, res) => {
    Menu.find({ "Store": req.body.restName })
      .then((menu) => {
        res.render('menu', { title: 'Listing options', menu });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
    req.body.itemOrder = parseInt(req.body.itemOrder)
    req.body.itemPrice = parseFloat(req.body.itemPrice)
    ShoppingCart.create({ "UID": curUID, "Order": req.body }, function (err) {
      if (err) {
        console.log("error entering order item")
      }
    });
  });

router.get('/shoppingcart',
  (req, res) => {
    ShoppingCart.find({ "UID": curUID })
      .then((shoppingCart) => {
        res.render('shoppingCart', { title: 'Showing order', shoppingCart });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
  });

router.post('/checkout', async (req, res) => {
  //console.log(req.body.totPrice);
  totalPrice = parseInt(req.body.totPrice*100);
  //console.log(totalPrice);
  //const { items, currency } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice,
    currency: 'usd',
    metadata: {integration_check: 'accept_a_payment'},
  });

  res.render('checkout', {title: 'render checkout page', publishableKey: 'pk_test_GZg5TkqlxznEkPGcNrjAJPli00gXt3dfhp', clientSecret: paymentIntent.client_secret});
  // Send publishable key and PaymentIntent details to client
  //res.send({
  //  
  //});

  
});

module.exports = router;