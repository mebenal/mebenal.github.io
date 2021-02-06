function loadDates() {
  const d = new Date();
  document.getElementById('fullYear').innerHTML = `&copy; ${d.getFullYear()}`;
  document.getElementById('lastModified').innerHTML = `Last Updated: ${document.lastModified}`;
}
