/* eslint-disable no-await-in-loop */
window.addEventListener('load', async () => {
  async function fetchPerson() {
    let resp;
    await fetch('https://www.ahfx.com/person.php')
      .then((response) => response.json())
      .then((jsonObject) => {
        // console.log(jsonObject.person);
        const { person } = jsonObject;
        const personObj = {};
        personObj.fullName = `${person.personal.name} ${person.personal.last_name}`;
        personObj.password = `${person.online_info.password}`;
        personObj.email = `${person.online_info.email}`;
        personObj.eye_color = `${person.personal.eye_color}`;
        personObj.cityCountry = `${person.personal.city}, ${person.personal.country}`;
        switch (person.marriage.married) {
          case true:
            switch (person.marriage.children) {
              case 0:
                personObj.children = 'No children.';
                break;
              default:
                personObj.children = person.marriage.children;
            }
            break;
          default:
            personObj.children = 'Not married';
            break;
        }
        personObj.ipAddress = person.online_info.ip_address;
        resp = personObj;
      });
    // console.log(resp);
    return resp;
  }

  const rowNum = 5;
  for (let i = 0; i < rowNum; i++) {
    const td = [];
    for (let j = 0; j < 8; j++) {
      td[j] = document.createElement('td');
    }
    const personObj = await fetchPerson();

    const div = document.createElement('div');
    const img = document.createElement('img');
    const tr = document.createElement('tr');

    div.classList.add('img');

    img.src = 'https://thispersondoesnotexist.com/image';
    img.alt = 'A fake person.';

    td[0].textContent = personObj.fullName;
    td[1].textContent = personObj.password;
    td[2].textContent = personObj.email;
    td[3].textContent = personObj.eye_color;
    td[4].textContent = personObj.cityCountry;
    td[5].textContent = personObj.children;
    td[6].textContent = personObj.ipAddress;
    td[7].appendChild(div).appendChild(img);

    for (let j = 0; j < 8; j++) {
      tr.appendChild(td[j]);
    }

    document.querySelector('tbody').appendChild(tr);
  }

  // document.getElementById('name').innerHTML = personObj.fullName;
  // document.getElementById('pass').innerHTML = personObj.password;
  // document.getElementById('email').innerHTML = personObj.email;
  // document.getElementById('eyes').innerHTML = personObj.eye_color;
  // document.getElementById('city').innerHTML = personObj.cityCountry;
  // document.getElementById('childNum').innerHTML = personObj.children;
  // document.getElementById('ipAdd').innerHTML = personObj.ipAddress;

  // console.log(personObj);
});
