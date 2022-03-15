const express = require("express");
const hotelsRouter = require("./router/hotelsRouter");
const restaurantsRouter = require("./router/restaurantsRouter");
const app = express();

//------------- MIDDLEWARE -------------\\

app.use(express.json());

app.use((_req, _res, next) => {
  console.log("Request received.");
  next();
});

//------------- ROUTES -------------\\

app.use("/hotels", hotelsRouter);
app.use("/restaurants", restaurantsRouter);

app.get("/", (_req, res) => {
  res.send(
    "use /hotels or /restaurants with the method GET to see or POST to add"
  );
});

app.get("*", (_req, res) => {
  res.status(404).send("error 404");
});

//------------- LOCALHOST -------------\\

app.listen(8000, () => {
  console.log("Listening...");
});
