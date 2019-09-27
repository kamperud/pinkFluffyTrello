chrome.runtime.onInstalled.addListener(function() {
    const defaultValue = {
        path: "https://images.unsplash.com/photo-1516642898673-edd1ced08e87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        description: "pink fluff"
    };
    chrome.storage.sync.set({image: defaultValue.path}, function() {
      console.log("The background image is "+ defaultValue.description);
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'trello.com'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
      
      chrome.browserAction.onClicked.addListener(function() {
        chrome.storage.sync.get('image', function(data) {
            const css= '"url(' + data.image + ')"';
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.executeScript(
                  tabs[0].id,
                  {code: 'document.getElementById("trello-root").style.backgroundImage = '+ css +';'});
            });
        });
     });
  });
