chrome.runtime.onInstalled.addListener(function() {
    const defaultValue = {
        path: "https://images.unsplash.com/photo-1516642898673-edd1ced08e87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        description: "pink fluff"
    };

    const defaultWebsite = {
      host: 'trello.com',
      backgroundIdentifier: 'trello-root'
    };

    chrome.storage.sync.set({image: defaultValue.path});

     chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
      const url = new URL(tab.url)
      if (url.hostname !== defaultWebsite.host) return;

      if (changeInfo.status == 'complete' && tab.active) {
        chrome.storage.sync.get(['image'], function(data) {
          const css= '"url(' + data.image + ')"';
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: 'document.getElementById("'+defaultWebsite.backgroundIdentifier+'").style.backgroundImage = '+ css +';'});
          });
      });
      }
    })
  });
