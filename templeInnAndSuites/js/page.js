window.addEventListener('load', () => {
  const hambutton = document.querySelector('.ham');
  const mainnav = document.querySelector('header nav');

  hambutton.addEventListener('click', () => {
    if (mainnav.style.display === 'block') {
      mainnav.style.display = 'none';
    } else {
      mainnav.style.display = 'block';
    }
  });

  window.onresize = () => { if (window.innerWidth > 552) mainnav.style.display = 'block'; };
});
