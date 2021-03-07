window.addEventListener('load', async () => {
  async function fetchTowns() {
    let resp;
    await fetch('https://byui-cit230.github.io/weather/data/towndata.json')
      .then((response) => response.json())
      .then((jsonObject) => {
        const { towns } = jsonObject;
        resp = towns;
      });
    return resp;
  }

  const towns = { Preston: 'homePreston', 'Fish Haven': 'homeFishHaven', 'Soda Springs': 'homeSodaSprings' };
  const townsObj = await fetchTowns();

  for (let i = 0; i < townsObj.length; i++) {
    if (townsObj[i].name in towns) {
      const selector = towns[townsObj[i].name];
      document.querySelector(`section.${selector} h2`).innerHTML = townsObj[i].name;
      document.querySelector(`section.${selector} h3`).innerHTML = townsObj[i].motto;
      document.querySelector(`section.${selector} p.homeFounded`).innerHTML = `Year Founded: ${townsObj[i].yearFounded}`;
      document.querySelector(`section.${selector} p.homePopulation`).innerHTML = `Population: ${townsObj[i].currentPopulation}`;
      document.querySelector(`section.${selector} p.homeRainfall`).innerHTML = `Annual Rain Fall: ${townsObj[i].averageRainfall}`;
      document.querySelector(`section.${selector} div img`).src = `images/${townsObj[i].name}.jpg`;
      document.querySelector(`section.${selector} div img`).alt = `Image from around ${townsObj[i].name}`;
    }
  }
});
