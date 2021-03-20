function buildTempleCard(temple) {
    const card = document.createElement('section');
    card.classList.add('templeCard');
    card.innerHTML = `<h2>${temple.name}</h2>
                      <div class='templeImg'><img src='${temple.imageurl}' alt='${temple.name}'></div>
                      <p><b>First President:</b> ${temple.presidents[0]} 1st of ${temple.presidents.length}</p>
                      <p><b>Current President:</b> ${temple.presidents[temple.presidents.length - 1]}</p>
                      <p><b>Phone:</b> ${temple.phone}</p>
                      <p><b>Address:</b> ${temple.address1}, ${temple.city}, ${temple.state} ${temple.zip}</p>`;
    return card;
}

function buildString(buildStr, num, unit) {
    return `${buildStr} ${num}${unit}`;
  }

window.addEventListener('load', async () => {
    const temples = await (await fetch("js/temples2.json")).json();
    console.log(temples);
    for (const temple of temples) {
        const templeCard = buildTempleCard(temple);
        document.querySelector('#temples').appendChild(templeCard);
    }
});
