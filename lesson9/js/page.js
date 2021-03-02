window.addEventListener('load', () => {
  const d = new Date();

  document.getElementById('fullYear').innerHTML = `&copy; ${d.getFullYear()}`;
  document.getElementById('lastModified').innerHTML = `${d.toLocaleDateString('en-US', { weekday: 'long' })}, ${d.getDay()} ${d.toLocaleDateString('en-US', { month: 'long' })} ${d.getFullYear()}`;

  const range = document.querySelector('#range');
  const hambutton = document.querySelector('.ham');
  const mainnav = document.querySelector('#navigation');
  const shut = document.querySelector('.shut');

  range.addEventListener('input', () => { document.getElementById('rangeNum').innerHTML = range.value; });
  hambutton.addEventListener('click', () => { mainnav.classList.toggle('responsive'); }, false);
  shut.addEventListener('click', () => {
    document.getElementById('banner').style.display = 'none';
    document.getElementById('gray').style.display = 'none';
  });

  if (d.getDay() === 5) {
    document.getElementById('banner').style.display = 'grid';
  }

  window.onresize = () => { if (window.innerWidth > 552) mainnav.classList.remove('responsive'); };
});
