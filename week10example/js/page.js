window.addEventListener('load', () => {
  const places = ['Preston', 'Fish Haven', 'Soda Springs'];
  const urls = ['api.openweathermap.org/data/2.5/forecast', 'api.openweathermap.org/data/2.5/weather'];
  for (let i = 0; i <  places.length; i++) {
      for (let j = 0; j < urls.length; j++) {
        const currUrl = `https://${urls[j]}?q=${places[i]},ID,US&appid=b6d0fa991fc39022cc45370d3ebf179f&units=imperial`
        fetch(currUrl)
          .then((response) => response.json())
          .then((weatherObj) => {
              console.log(weatherObj);
          })
      }
    
  }
})