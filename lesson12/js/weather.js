window.addEventListener('load', async () => {
  async function getWeatherOpen(url, place) {
    const currUrl = `https://${url}?q=${place},ID,US&appid=b6d0fa991fc39022cc45370d3ebf179f&units=imperial`;
    return (await fetch(currUrl)).json();
  }

  async function getWeather(latLong) {
    const url = `https://api.weather.gov/points/${latLong}`;
    const weather = {};

    let response = await fetch(url);
    response = await response.json();

    const dataUrl = await response.properties.forecastGridData;
    const forecastUrl = response.properties.forecast;

    let forecastResponse = await fetch(forecastUrl);
    let dataResponse = await fetch(dataUrl);

    forecastResponse = await forecastResponse.json();
    dataResponse = await dataResponse.json();
    console.log(forecastResponse);

    weather.fiveDayImgs = [];
    weather.fiveDayImgsAlt = [];

    for (let i = 0; i < 5; i++) {
      weather.fiveDayImgs[i] = forecastResponse.properties.periods[i * 2].icon;
      weather.fiveDayImgsAlt[i] = forecastResponse.properties.periods[i * 2].name;
    }

    [forecastResponse] = forecastResponse.properties.periods;
    dataResponse = dataResponse.properties;

    weather.forecast = forecastResponse.shortForecast;
    weather.temperature = forecastResponse.temperature;
    weather.humidity = dataResponse.relativeHumidity.values[0].value;
    weather.windSpeed = dataResponse.windSpeed.values[0].value;

    return weather;
  }

  // Coords for Preston.
  const weather1 = await getWeather('42.0963133,-111.8766173');
  // Possibly the most ghetto code I've ever written for this class.
  // If you see it, mourn the time I could have spent making it better.
  // But for now, I move to networking homework.

  // Coords for Preston.
  const places = ['Preston', 'Fish Haven', 'Soda Springs'];
  const urls = ['api.openweathermap.org/data/2.5/forecast', 'api.openweathermap.org/data/2.5/weather'];

  const weather = await getWeatherOpen(urls[1], places[0]);
  console.log(weather);
  const weatherForecast = (await getWeatherOpen(urls[0], places[0]))
    .list.filter(time => (time.dt + 21600) % 86400 === 0);

  document.getElementById('shortForecast').innerHTML = weather.weather[0].main;
  document.getElementById('temperature').innerHTML = weather.main.temp;
  document.getElementById('humidity').innerHTML = weather.main.humidity;
  document.getElementById('windSpeed').innerHTML = weather.wind.speed;

  if (weather.main.temp <= 50 && weather.wind.speed > 3.0) {
    const windChill = 35.74 + (0.6215 * weather.main.temp)
    - (35.75 * (weather.wind.speed ** 0.16))
    + ((0.4275 * weather.main.temp) * weather.wind.speed ** 0.16);
    document.getElementById('windChill').innerHTML = `${Math.round(windChill * 10) / 10}&deg;F`;
  } else {
    document.getElementById('windChill').innerHTML = 'N/A';
  }

  const test = document.getElementsByClassName('fiveDayLi');
  for (let i = 0; i < test.length; i++) {
    test[i].childNodes[0].innerHTML = new Date(weatherForecast[i].dt * 1000)
      .toString().substr(0, 3);
    test[i].childNodes[1].src = `https://openweathermap.org/img/w/${weatherForecast[i].weather[0].icon}.png`;
    test[i].childNodes[1].alt = '';
    test[i].childNodes[2].innerHTML = `${weatherForecast[i].main.temp}&deg;F`;
  }
});
