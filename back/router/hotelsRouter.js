const data = require("../json/hotels.json");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { query } = require("express");

//------------- SCHEMA -------------\\

const hotel = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  stars: Joi.number().min(1).max(5).required(),
  hasSpa: Joi.boolean().required(),
  hasPool: Joi.boolean().required(),
  priceCategory: Joi.number().min(1).max(3).required(),
});

//------------- MIDDLEWARE -------------\\

function handleHotelId(req, res, next) {
  hotelId = data.find((hotel, index) => {
    hotelIndex = index;
    return hotel.id.toString() === req.params.id.toString();
  });

  if (!hotelId) {
    return res.status(400).json({
      error: "Error 400",
      description: `${req.params.id} id does not exists`,
    });
  }

  next();
}

function checkHotel(req, res, next) {
  const validation = hotel.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: "Error 400",
      description: validation.error.details[0].message,
    });
  }
  next();
}

//------------- ROUTES GET -------------\\

router.get("/", (_req, res) => {
  res.json(data);
});

// ID

router.get("/:id", handleHotelId, (_req, res) => {
  res.json(hotelId);
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

// PRICE CATEGORY

router.get("/priceCategory/:priceCategory", (req, res) => {
  const priceCategory = req.params.priceCategory;

  const filterPrice = data.filter(
    (elem) => elem.priceCategory.toString() === priceCategory.toString()
  );

  if (filterPrice.length < 1) {
    return res.json({
      error: `Error. ${priceCategory} is unavailable`,
    });
  }

  res.json(filterPrice);
});

// SPA & POOL

router.get("/activities/:activities", (req, res) => {
  const activities = req.params.activities;

  switch (activities) {
    case "hasPool":
      const hasPool = [];
      const filterPool = data.filter((elem) => {
        elem.hasPool === true ? hasPool.push(elem) : null;
      });

      if (!filterPool) {
        return res.json({
          error: `Error. ${hasPool} is unknown`,
        });
      }

      res.json(hasPool);
      break;
    case "hasSpa":
      const hasSpa = [];
      const filterSpa = data.filter((elem) => {
        elem.hasSpa === true ? hasSpa.push(elem) : null;
      });

      if (!filterSpa) {
        return res.json({
          error: `Error. ${spa} is unknown`,
        });
      }

      res.json(hasSpa);
      break;
  }
});

//------------- ROUTES POST -------------\\

router.post("/", checkHotel, (req, res) => {
  const addHotel = {
    id: data.length + 1,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    hasSpa: req.body.hasSpa,
    hasPool: req.body.hasPool,
    stars: req.body.stars,
    priceCategory: req.body.priceCategory,
  };

  data.push(addHotel);
  res.status(200).json({ message: "Hotel added", description: addHotel });
});

//------------- ROUTES PATCH -------------\\

router.patch("/:id", handleHotelId, (req, res) => {
  hotelId.name = req.body.name;
  res.json({ message: "Name changed successful", description: hotelId });
});

//------------- ROUTES DELETE -------------\\

router.delete("/:id", handleHotelId, (_req, res) => {
  data.splice(hotelIndex, 1);

  res.json(data);
});

module.exports = router;
