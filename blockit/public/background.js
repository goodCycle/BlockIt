chrome.contextMenus.create({ 
  id: 'BlockIt',
  title: 'BlockIt',
  contexts: ['all']
});

chrome.tabs.onUpdated.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true, status: 'complete'}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'urlUpdate', url: tabs[0].url});
  });
});