let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});



const pinkFluffPath = 'https://images.unsplash.com/photo-1516642898673-edd1ced08e87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80';
const pinkFluffUrl = '"url(' + pinkFluffPath + ')"';

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundImage = '+pinkFluffUrl+';'});
        //   {code: 'document.body.style.backgroundImage = url("' + pinkFluff + '");'});
        //   {code: 'document.body.style.backgroundImage = "url("'+pinkFluff+'")";'});
    });
};