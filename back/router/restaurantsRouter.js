const data = require("../json/restaurants.json");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { query } = require("express");

// JOI SCHEMA
const restaurant = Joi.object({
  name: Joi.string().max(30).required(),
  address: Joi.string().alphanum().max(50).required(),
  city: Joi.string().max(30).required(),
  country: Joi.string().max(30).required(),
  stars: Joi.number().min(1).max(5).required(),
  cuisine: Joi.string().max(30).required(),
  priceCategory: Joi.number().min(1).max(3),
});

// MIDDLEWARE
function handleRestaurantId(req, res, next) {
  restaurantId = data.find((restaurant, index) => {
    restaurantIndex = index;
    return restaurant.id.toString() === req.params.id.toString();
  });

  if (!restaurantId) {
    return res.status(400).json({
      error: "Error 400",
      description: `${req.params.id} id does not exists`,
    });
  }

  next();
}

function checkRestaurant(req, res, next) {
  const validation = restaurant.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: "Error 400",
      description: validation.error.details[0].message,
    });
  }
  next();
}

// ROUTES GET
router.get("/", (_req, res) => {
  res.json(data);
});

router.get("/:id", handleRestaurantId, (_req, res) => {
  res.json(restaurantId);
});

router.get("/country/:country", (req, res) => {
  const country = req.params.country;

  const filterCountry = data.filter(
    (elem) => elem.country.toLowerCase() === country.toLowerCase()
  );

  if (filterCountry.length < 1) {
    return res.json({
      error: `Error. ${country} is unknown`,
    });
  }

  res.json(filterCountry);
});

router.get("/priceCategory/:priceCategory", (req, res) => {
  const price = req.params.priceCategory;

  const filterPrice = data.filter(
    (elem) => elem.price.toLowerCase() === price.toLowerCase()
  );

  if (filterPrice.length < 1) {
    return res.json({
      error: `Error. ${price} is unavailable`,
    });
  }

  res.json(filterPrice);
});

// ROUTES POST
router.post("/", checkRestaurant, (req, res) => {
  const addRestaurant = {
    id: data.length + 1,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    stars: req.body.stars,
    cuisine: req.body.cuisine,
    priceCategory: req.body.priceCategory,
  };

  data.push(addRestaurant);
  res
    .status(200)
    .json({ message: "Restaurant added", description: addRestaurant });
});

// ROUTES PATCH
router.patch("/:id", handleRestaurantId, (req, res) => {
  restaurantId.name = req.body.name;
  res.json({ message: "Name changed successful", description: restaurantId });
});

// ROUTES DELETE
router.delete("/:id", handleRestaurantId, (_req, res) => {
  data.splice(restaurantIndex, 1);

  res.json(data);
});

module.exports = router;
