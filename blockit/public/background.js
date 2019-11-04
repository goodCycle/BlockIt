chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({ 
    id: 'BlockIt',
    title: 'BlockIt',
    contexts: ['all']
  });
  
  //React 모달을 DOM에 주입하는 명령
  chrome.tabs.query({active: true, currentWindow: true, status: 'complete'}, tabs => {
    console.log('onInstall');
    chrome.tabs.sendMessage(tabs[0].id, {type: 'injectDialogToDOM'});
  });
});


// chrome.webNavigation.onCompleted.addListener(function() {
//   console.log('webNavigation Complete!');
//   chrome.tabs.query({active: true, currentWindow: true, status: 'complete'}, tabs => {
//     console.log(tabs);
//     const url = tabs[0].url;
//     console.log(url);
//     const isYoutube = url.includes('www.youtube.com');
//     const hasVideoId = url.split('v=')[1] !== undefined;
//     if (isYoutube && hasVideoId) {
//       const url = new URL(tabs[0].url);
//       var videoId = url.search.split('v=')[1];
//       var ampersandPosition = videoId.indexOf('&');
//       if(ampersandPosition !== -1) {
//         videoId = videoId.substring(0, ampersandPosition);
//       }
//       chrome.tabs.sendMessage(tabs[0].id, {type: 'getIntoYoutubeVideo', videoId });
//       // chrome.runtime.sendMessage(chrome.runtime.id, {type: 'getIntoYoutubeVideo', videoId });
//     }
//   });
// }, {url: [{urlMatches : 'https://www.youtube.com/'}]});

// chrome.runtime.onMessage.addListener(function(message, callback) {
//   if (message.data == "setAlarm") {
//     chrome.alarms.create({delayInMinutes: 5})
//   }
//   else if (message.data == "runLogic") {
//     chrome.tabs.executeScript({file: 'logic.js'});
//   }
//   else if (message.data == "changeColor") {
//     chrome.tabs.executeScript(
//       {code: 'document.body.style.backgroundColor="orange"'});
//   };
// });

chrome.tabs.onUpdated.addListener(() => {
  chrome.tabs.query({active: true, currentWindow: true, status: 'complete'}, tabs => {
    console.log(tabs);
    const url = tabs[0].url;
    console.log(url);
    const isYoutube = url.includes('www.youtube.com');
    const hasVideoId = url.split('v=')[1] !== undefined;
    if (isYoutube && hasVideoId) {
      const url = new URL(tabs[0].url);
      var videoId = url.search.split('v=')[1];
      var ampersandPosition = videoId.indexOf('&');
      if(ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
      chrome.tabs.sendMessage(tabs[0].id, {type: 'getIntoYoutubeVideo', videoId });
      // chrome.runtime.sendMessage(chrome.runtime.id, {type: 'getIntoYoutubeVideo', videoId });
    }
  });
});