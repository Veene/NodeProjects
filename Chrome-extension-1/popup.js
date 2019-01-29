let changeColor = document.getElementById('changeColor');

chrome.storage.local.get('color', (data) => {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
})

changeColor.onclick = (element) => {
  //we set value attribute earlier above when we load color in local storage
  let color = element.target.value;
  //choose only active tab in current window, and return it in callback data
  chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
    chrome.tabs.executeScript(
      tab[0].id,
      {code: 'document.body.style.backgroundColor = "' + color + '";'}
    );
  });
};