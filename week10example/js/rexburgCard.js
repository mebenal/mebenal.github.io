window.addEventListener('load', async () => {
    async function getWeatherOpen(url, place) {
      const currUrl = `https://${url}?q=${place},ID,US&appid=b6d0fa991fc39022cc45370d3ebf179f&units=imperial`;
      return (await fetch(currUrl)).json();
    }
  
    // Possibly the most ghetto code I've ever written for this class.
    // If you see it, mourn the time I could have spent making it better.%
    // But for now, I move to networking homework.
  
    // Coords for Preston.
    const places = ['Rexburg'];
    const urls = ['api.openweathermap.org/data/2.5/forecast', 'api.openweathermap.org/data/2.5/weather'];
  
    const weather = await getWeatherOpen(urls[1], places[0]);
    const weatherForecast = (await getWeatherOpen(urls[0], places[0]))
      .list.filter(time => (time.dt + 21600) % 86400 === 0);
    console.log(weatherForecast);
    console.log(weather);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayName = days[new Date(weather.dt * 1000).getDay()];

    document.getElementById('cardTemperature').innerHTML = weather.main.temp;
    document.getElementById('cardImg').src = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    document.getElementById('cardDayName').innerHTML = dayName;
    document.getElementById('cardDate').innerHTML = new Date(weather.dt * 1000).toLocaleString('en-US').substr(0, 9);
  
    const test = document.getElementsByClassName('fiveDayLi');
    console.log(weatherForecast);
    for (let i = 0; i < test.length; i++) {
      test[i].childNodes[0].innerHTML = new Date(weatherForecast[i].dt * 1000)
        .toString().substr(0, 3);
      test[i].childNodes[1].src = `https://openweathermap.org/img/w/${weatherForecast[i].weather[0].icon}.png`;
      test[i].childNodes[1].alt = '';
      test[i].childNodes[2].innerHTML = `${weatherForecast[i].main.temp_max}&deg;F`;
    }
  });
  