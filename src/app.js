// AFTER ADDING PARTIALS, RUN THIS COMMAND FOR RUNNING THIS FILE : nodemon src/app.js -e js, hbs

const path = require("path"); // no need to install it coz core node module its inbuilt
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__filename);
// console.log(__dirname);

const app = express();
const port = process.env.PORT || 5000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static file directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render(
    "C:/Users/KhushbooMakhija/Desktop/Learning/NodeJS Course/04_Web-server/templates/views/index.hbs",
    {
      title: "Weather",
      name: "Khushboo Makhija",
    }
  );
});

app.get("/about", (req, res) => {
  res.render(
    "C:/Users/KhushbooMakhija/Desktop/Learning/NodeJS Course/04_Web-server/templates/views/about.hbs",
    {
      title: "Weathers",
      name: "Khushboo Makhija",
    }
  );
});

app.get("/help", (req, res) => {
  res.render(
    "C:/Users/KhushbooMakhija/Desktop/Learning/NodeJS Course/04_Web-server/templates/views/help.hbs",
    {
      helpText:
        "This is helpful text: Where u r? Enter to the input field! U will be getting weather information of your location with its location",
      title: "Help",
      name: "Khushboo Makhija",
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "khushboo makhija",
    errorMessage: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a addresss term!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: "It is snowing",
  //   location: "India",
  //   address: req.query.address
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// '*' = wild card character
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "khushboo makhija",
    errorMessage: "Page not found",
  });
});

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000/");
});
