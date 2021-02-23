window.addEventListener('load', () => {
  const modDate = new Date(document.lastModified);
  const modDateSep = {};
  modDateSep.day = modDate.getDate();
  modDateSep.month = modDate.getMonth() + 1;
  modDateSep.year = modDate.getFullYear();
  document.getElementsByTagName('tfoot')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0]
    .innerHTML = `Compiled ${modDateSep.month}.${modDateSep.day}.${modDateSep.year} by Michael Ebenal`;
});
