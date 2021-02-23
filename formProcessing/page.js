window.addEventListener('load', () => {
  const button = document.querySelector('#button');
  const infoDict = {};
  button.addEventListener('click', () => {
    infoDict.name = document.getElementById('name').value;
    infoDict.email = document.getElementById('mail').value;
    infoDict.msg = document.getElementById('msg').value;
    console.log(`Name: ${infoDict.name}\nEmail: ${infoDict.email}\nMessage: ${infoDict.msg}\n`);
  }, false);
});
