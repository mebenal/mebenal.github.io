window.addEventListener('load', async () => {
  document.getElementById('hideMe').style.display = 'none';
  const { temples } = await (await fetch('temples.json')).json();
  const main = document.querySelector('.temple');
  temples.forEach(async element => {
    const templeDiv = document.createElement('div');
    const locDiv = document.createElement('div');
    const city = document.createElement('span');
    const country = document.createElement('span');
    const name = document.createElement('h3');
    const status = document.createElement('p');
    const phone = document.createElement('p');
    const address = document.createElement('p');
    const img = document.createElement('img');
    const temp = document.createElement('p');
    const wind = document.createElement('p');
    const forecast = document.createElement('p');
    const milep = document.createElement('p');
    const closep = document.createElement('p');
    const milestones = document.createElement('div');
    const closures = document.createElement('div');

    if (element.address === 'null') {
      element.address = 'No address';
    }
    if (element.phone === 'null') {
      element.phone = 'No phone';
    }
    if (element.closures.length === 0) {
      element.closures.push({ closure: 'No closures planned' });
    }
    if (element.img === 'null') {
      element.img = 'images/image-not-found.svg';
    }

    city.innerHTML = element.city;
    country.innerHTML = element.country;
    name.innerHTML = element.name;
    status.innerHTML = `<strong>Temple Status:</strong> ${element.status}`;
    phone.innerHTML = `<strong>Phone:</strong> ${element.phone}`;
    address.innerHTML = `<strong>Address:</strong> ${element.address}`;
    img.src = element.img;
    img.alt = element.name;
    img.loading = 'lazy';
    milep.innerHTML = '<strong>Milestones</strong>';
    milestones.appendChild(milep);
    element.milestones.forEach(element => {
      const container = document.createElement('div');
      const date = document.createElement('p');
      const milestone = document.createElement('p');

      date.innerHTML = element.date;
      milestone.innerHTML = `<strong>${element.milestone}: </strong>`;

      container.appendChild(milestone);
      container.appendChild(date);
      milestones.appendChild(container);
    });
    closep.innerHTML = '<strong>Closures</strong>';
    closures.appendChild(closep);
    element.closures.forEach(element => {
      const container = document.createElement('div');
      const closure = document.createElement('p');

      closure.innerHTML = element.closure;

      container.appendChild(closure);
      closures.appendChild(container);
    });
    locDiv.classList.add('place');
    locDiv.style.display = 'none';
    const options = {
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(async (entries, divObserver) => {
      entries.forEach(async entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          const urls = ['api.openweathermap.org/data/2.5/forecast', 'api.openweathermap.org/data/2.5/weather'];
          const container = entry.target;
          const foreUrl = `https://${urls[1]}?q=${container.childNodes[0].childNodes[0].innerHTML.trim()},${container.childNodes[0].childNodes[1].innerHTML}&appid=fc4f5e0fad0b17189ec5504b1c45fdee&units=imperial`;
          const fore = await (await fetch(foreUrl)).json();
          container.childNodes[6].innerHTML = `<strong>Temperature:</strong> ${fore.main.temp}&deg;F`;
          container.childNodes[7].innerHTML = `<strong>Wind:</strong> ${fore.wind.speed}MPH`;
          container.childNodes[8].innerHTML = `<strong>Forecast:</strong> ${fore.weather[0].description}`;
          divObserver.unobserve(entry.target);
        }
      });
    }, options);
    observer.observe(templeDiv);

    locDiv.appendChild(city);
    locDiv.appendChild(country);

    templeDiv.appendChild(locDiv);
    templeDiv.appendChild(name);
    templeDiv.appendChild(img);
    templeDiv.appendChild(status);
    templeDiv.appendChild(phone);
    templeDiv.appendChild(address);
    templeDiv.appendChild(forecast);
    templeDiv.appendChild(temp);
    templeDiv.appendChild(wind);
    templeDiv.appendChild(milestones);
    templeDiv.appendChild(closures);

    main.appendChild(templeDiv);
  });
});
