window.addEventListener('load', () => {
  const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';
  fetch(requestURL)
    .then((response) => response.json())
    .then((jsonObject) => {
      // console.table(jsonObject); // temporary checking for valid response and data parsing
      const { prophets } = jsonObject;

      for (let i = 0; i < prophets.length; i++) {
        const card = document.createElement('section');
        const h2 = document.createElement('h2');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const img = document.createElement('img');
        const div = document.createElement('div');

        h2.textContent = `${prophets[i].name} ${prophets[i].lastname}`;
        p1.textContent = `Date of Birth: ${prophets[i].birthdate}`;
        p2.textContent = `Place of Birth: ${prophets[i].birthplace}`;
        img.src = prophets[i].imageurl;
        img.alt = `${prophets[i].name} ${prophets[i].lastname} - ${prophets[i].order}`;

        card.appendChild(h2);
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(div).appendChild(img);

        document.querySelector('div.cards').appendChild(card);
      }
    });
});
