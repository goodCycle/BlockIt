chrome.contextMenus.create({ 
  id: 'BlockIt',
  title: 'BlockIt',
  contexts: ['all']
});

chrome.tabs.onUpdated.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true, status: 'complete'}, tabs => {
    const url = tabs[0].url;
    const isYoutube = url.includes('www.youtube.com');
    const hasVideoId = url.split('v=')[1] !== undefined;
    if (isYoutube && hasVideoId) {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'getIntoYoutubeVideo'});
    }
  });
});