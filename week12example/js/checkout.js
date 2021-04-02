/* eslint-disable no-mixed-operators */
window.addEventListener('load', () => {
  console.log(document.querySelector('.cc-number'));
  document.querySelector('.cc-number').addEventListener('input', () => {
    function ccFormat(value) {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = matches && matches[0] || '';
      const parts = [];
      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      if (parts.length) {
        return parts.join(' ');
      } else {
        return value;
      }
    }
    const ccInput = document.querySelector('.cc-number').value;
    const ccOutput = ccFormat(ccInput);
    document.querySelector('.cc-number').value = ccOutput;
  });
});
