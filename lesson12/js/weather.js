window.addEventListener('load', async () => {
  async function getWeatherOpen(url, place) {
    const currUrl = `https://${url}?q=${place},ID,US&appid=b6d0fa991fc39022cc45370d3ebf179f&units=imperial`;
    return (await fetch(currUrl)).json();
  }

  async function getWeather(latLong) {
    const url = `https://api.weather.gov/points/${latLong}`;

    let response = await fetch(url);
    response = await response.json();

    const forecastUrl = response.properties.forecast;

    let forecastResponse = await fetch(forecastUrl);
    forecastResponse = await forecastResponse.json();
    forecastResponse = forecastResponse.properties.periods;

    return forecastResponse;
  }

  // Coords for Preston.
  const weather1 = await getWeather('42.0963133,-111.8766173');

  const page = document.getElementById('weatherPage').innerHTML;
  const fiveDay = document.querySelector('.fiveDayForecast div');
  for (let detailedForecast of weather1) {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const img = document.createElement('img');

    img.src = detailedForecast.icon;
    img.alt = `${detailedForecast.name} icon`
    h3.innerHTML = `${detailedForecast.name}: `;
    p.innerHTML = detailedForecast.detailedForecast;

    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    fiveDay.appendChild(div);
  }
  // Possibly the most ghetto code I've ever written for this class.
  // If you see it, mourn the time I could have spent making it better.
  // But for now, I move to networking homework.

  // Coords for Preston.
  const urls = ['api.openweathermap.org/data/2.5/forecast', 'api.openweathermap.org/data/2.5/weather'];

  const weather = await getWeatherOpen(urls[1], page);
  console.log(weather1);
  const weatherForecast = (await getWeatherOpen(urls[0], page))
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
