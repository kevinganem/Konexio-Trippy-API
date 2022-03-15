const data = require("../restaurants.json");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const restaurant = Joi.object({
  name: Joi.string().max(30).required(),
  address: Joi.string().alphanum().max(50).required(),
  city: Joi.string().max(30).required(),
  country: Joi.string().max(30).required(),
  stars: Joi.number.min(1).max(5).required(),
  cuisine: Joi.string().max(30).required(),
  priceCategory: Joi.number().min(1).max(3),
});

router.get("/", (_req, res) => {
  res.json(data);
});
router.get("/:id", (req, res) => {
  const restaurantId = data.find((restaurant) => {
    return restaurant.id.toString() === req.params.id.toString();
  });

  res.json(restaurantId);
});

module.exports = router;
