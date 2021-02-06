window.addEventListener('load', () => {
  const d = new Date();

  document.getElementById('fullYear').innerHTML = `&copy; ${d.getFullYear()}`;
  document.getElementById('lastModified').innerHTML = `${d.toLocaleDateString('en-US', { weekday: 'long' })}, ${d.getDay()} ${d.toLocaleDateString('en-US', { month: 'long' })} ${d.getFullYear()}`;

  const hambutton = document.querySelector('.ham');
  const mainnav = document.querySelector('#navigation');

  hambutton.addEventListener('click', () => { mainnav.classList.toggle('responsive'); }, false);

  window.onresize = () => { if (window.innerWidth > 552) mainnav.classList.remove('responsive'); };
});
