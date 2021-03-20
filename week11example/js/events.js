window.addEventListener('load', async () => {
    const file = await (await fetch('http://www.ahfx.com/events.php')).json();
    console.log(file);
    Object.entries(file).forEach(([key,event]) => {
        console.log(event);
        const card = document.createElement('div');
        card.classList.add('card');

        const loc = document.createElement('p');
        loc.classList.add('location');
        loc.innerHTML = event.properties.location;

        const name = document.createElement('h2');
        name.classList.add('title');
        name.innerHTML = event.properties.name;

        const date = document.createElement('p');
        date.classList.add('date');
        const startDate = new Date(event.properties.start);
        date.innerHTML = `${startDate.toLocaleDateString('en-US', { weekday: 'long' })}, ${startDate.getDate()} ${startDate.toLocaleDateString('en-US', { month: 'long' })} ${startDate.getFullYear()} ${startDate.toTimeString().substr(0, 5)}`;

        const type = document.createElement('div');
        type.classList.add('class-type');
        const typeP = document.createElement('p');
        typeP.innerHTML = event.type;
        type.appendChild(typeP);

        const desc = document.createElement('p');
        desc.classList.add('summary');
        desc.innerHTML = event.properties.summary;

        const tagHolder = document.createElement('div');
        tagHolder.classList.add('tags');

         for (let i = 0; i < event.tags.length; i++) {
            const tag = document.createElement('p');
            tag.classList.add(event.tags[i].replace(/\s/g, ''));
            tag.innerHTML = event.tags[i];
            tagHolder.appendChild(tag);
            if (event.tags[i] == 'Cancelled') {
                tagHolder.style.backgroundColor = 'red';
            }
        }
        card.appendChild(type);
        card.appendChild(tagHolder);
        card.appendChild(name);
        card.appendChild(date);
        card.appendChild(loc);
        document.querySelector('#main').appendChild(card);

    });
    
});
