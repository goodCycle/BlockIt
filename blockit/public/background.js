chrome.contextMenus.create({ 
  id: 'HeadlineFetcher',
  title: 'Get Headlines',
  contexts: ['all']
});

chrome.contextMenus.onClicked.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'getHeadlines'});
  });
});

chrome.tabs.onUpdated.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true, status: 'complete'}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'urlUpdate', url: tabs[0].url});
  });
});