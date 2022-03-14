const data = require("../restaurants.json");
const express = require("express");
const router = express.Router();

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
