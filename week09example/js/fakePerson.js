window.addEventListener('load', async () => {
    async function fetchPerson() {
        let resp;
        await fetch('https://www.ahfx.com/person.php')
            .then((response) => response.json())
            .then((jsonObject) => {
                //console.log(jsonObject.person);
                const person = jsonObject.person;
                const personObj = {};
                personObj.fullName = `${person.personal.name} ${person.personal.last_name}`;
                personObj.password = `${person.online_info.password}`;
                personObj.email = `${person.online_info.email}`;
                personObj.eye_color = `${person.personal.eye_color}`;
                personObj.cityCountry = `${person.personal.city}, ${person.personal.country}`;
                switch(person.marriage.married) {
                    case false:
                        personObj.children = `Not married`;
                        break;
                    case true:
                        switch(person.marriage.children) {
                            case 0:
                                personObj.children = `No children.`;
                                break
                            default:
                                personObj.children = person.marriage.children;
                        }
                        break;
                };
                personObj.ipAddress = person.online_info.ip_address;
                resp = personObj
            })
            //console.log(resp);
            return resp;
        }
        personObj = await fetchPerson();
        
        document.getElementById('name').innerHTML = personObj.fullName;
        document.getElementById('pass').innerHTML = personObj.password;
        document.getElementById('email').innerHTML = personObj.email;
        document.getElementById('eyes').innerHTML = personObj.eye_color;
        document.getElementById('city').innerHTML = personObj.cityCountry;
        document.getElementById('childNum').innerHTML = personObj.children;
        document.getElementById('ipAdd').innerHTML = personObj.ipAddress;
           
        //console.log(personObj);

});