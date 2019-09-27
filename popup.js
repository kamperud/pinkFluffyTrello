chrome.storage.sync.get('image', function(data) {
    const css= '"url(' + data.image + ')"';
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.getElementById("trello-root").style.backgroundImage = '+ css +';'});
    });
});