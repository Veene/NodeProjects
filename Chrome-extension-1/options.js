let buttonDiv = document.getElementById('buttonDiv');
const buttonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

const loadDifferentButtons = (buttonColorsYouWant) => {
  for(let buttonColor of buttonColorsYouWant) {
    let button = document.createElement('button');
    button.style.backgroundColor = buttonColor;
    button.addEventListener('click', () => {
      chrome.storage.local.set({color: buttonColor}, () => {
        console.log('color is: ', buttonColor)
      });
      window.close();
    });
    buttonDiv.appendChild(button);
  }
}
loadDifferentButtons(buttonColors);