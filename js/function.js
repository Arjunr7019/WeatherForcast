let weather = {
    apiKey: "2858092d7472f3fb75d67766ac57415f",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { country } = data.sys;
      const { icon, description , main } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { pressure } = data.main;
      const { lon , lat } = data.coord;
      // let weatherState = mian;
      document.querySelector(".city").innerText = "" + name + "," + country;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".pressure").innerText =
        "Pressure: " + pressure + " hPa";
      // document.querySelector(".longitude").innerText =
      //   "Longitude: " + lon;
      // document.querySelector(".latitude").innerText =
      //   "Latitude: " + lat;
      document.querySelector(".weather").classList.remove("loading");
      if(main === "Clouds"){
        document.body.style.backgroundImage =
          "url('img/img5.jpeg')";
      }else if(main === 	"Clear"){
        document.body.style.backgroundImage =
          "url('img/ClearSky.jpg')";
      }else if(main === "Rain"){
        document.body.style.backgroundImage =
          "url('img/rainy.jpg')";
      }
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Bengaluru");

