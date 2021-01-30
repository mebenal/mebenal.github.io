window.addEventListener('load', ()=>{
    let d = new Date();
    document.getElementById("fullYear").innerHTML = "&copy; " + d.getFullYear();
    document.getElementById("lastModified").innerHTML = "Last Updated: " + document.lastModified;

    const hambutton = document.querySelector(".ham");
    const mainnav = document.querySelector("#navigation");

    hambutton.addEventListener('click', ()=> {mainnav.classList.toggle('responsive')},false);
    
    window.onresize = ()=> {if(window.innerWidth>552) mainnav.classList.remove('responsive');};
});