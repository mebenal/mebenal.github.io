window.addEventListener('load', async () => {
  async function getWeatherOpen(url, place) {
    const currUrl = `https://${url}?q=${place},ID,US&appid=b6d0fa991fc39022cc45370d3ebf179f&units=imperial`;
    return (await fetch(currUrl)).json();
  }

  // Possibly the most ghetto code I've ever written for this class.
  // If you see it, mourn the time I could have spent making it better.
  // But for now, I move to networking homework.

  // Coords for Preston.
  const places = ['Preston', 'Fish Haven', 'Soda Springs'];
  const urls = ['api.openweathermap.org/data/2.5/forecast', 'api.openweathermap.org/data/2.5/weather'];

  const weather = await getWeatherOpen(urls[1], places[0]);
  const weatherForecast = (await getWeatherOpen(urls[0], places[0]))
    .list.filter(time => (time.dt + 21600) % 86400 === 0);

  console.log(weatherForecast);

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
  console.log(test);
  for (let i = 0; i < test.length; i++) {
    test[i].childNodes[0].innerHTML = new Date(weatherForecast[i].dt * 1000)
      .toString().substr(0, 3);
    test[i].childNodes[1].src = `https://openweathermap.org/img/w/${weatherForecast[i].weather[0].icon}.png`;
    test[i].childNodes[1].alt = '';
    test[i].childNodes[2].innerHTML = `${weatherForecast[i].main.temp}&deg;F`;
  }
});
