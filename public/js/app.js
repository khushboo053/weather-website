console.log("Hello client side JS loaded!");

// fetch("https://puzzle.mead.io/puzzle").then((res) => {
//   res.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:5000/weather?address=Surat").then((res) => {
//   res.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
//   // .catch((err) => {
//   //   console.log(err);
//   // });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents the default behaviour of refreshing of page

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:5000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        // console.log(data.error);
      } else {
        messageOne.textContent = data.location;
        // messageTwo.textContent = data.forecast;
        messageTwo.textContent =
          "Wind Speed: " +
          data.forecast.windSpeed +
          "m/s, Wind Degree: " +
          data.forecast.windDeg +
          "° and Humidity : " +
          data.forecast.humidity +
          "%. with pressure of " +
          data.forecast.pressure +
          ". It feels like " +
          data.forecast.feels_like +
          " because weather is like " +
          data.forecast.weather + ".";
        // console.log(data.location);
        // console.log(data.forecast);
      }
    });
    // .catch((err) => {
    //   console.log(err);
    // });
  });

  // console.log(location);
});
