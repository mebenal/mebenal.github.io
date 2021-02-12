window.addEventListener('load', async () => {
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
 
    weather.fiveDayImgs = [];
    weather.fiveDayImgsAlt = [];

    for (let i = 0; i < 5; i++) {
      weather.fiveDayImgs[i] = forecastResponse.properties.periods[i * 2].icon
      weather.fiveDayImgsAlt[i] = forecastResponse.properties.periods[i * 2].name
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
  const weather = await getWeather('42.0963133,-111.8766173');

  document.getElementById('shortForecast').innerHTML = weather.forecast;
  document.getElementById('temperature').innerHTML = weather.temperature;
  document.getElementById('humidity').innerHTML = weather.humidity;
  document.getElementById('windSpeed').innerHTML = weather.windSpeed;
  
  if (weather.temperature <= 50 && weather.windSpeed > 3.0) {
    const windChill = 35.74 + (0.6215 * weather.temperature) - (35.75 * (weather.windSpeed ** 0.16))
    + ((0.4275 * weather.temperature) * weather.windSpeed ** 0.16);
    document.getElementById('windChill').innerHTML = `${Math.round(windChill * 10) / 10}&deg;F`;
  } else {
    document.getElementById('windChill').innerHTML = 'N/A';
  }

  const test = document.getElementsByClassName('fiveDayImg');
  for (let i = 0; i < test.length; i++) {
    test[i].src = weather.fiveDayImgs[i];
    test[i].alt = weather.fiveDayImgsAlt[i];
  }
});
