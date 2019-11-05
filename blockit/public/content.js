addModalToDOM = () => {
  const modal = document.createElement('dialog');
  modal.id = 'modal';
  modal.setAttribute("style", "height:60%; width: 60%; position: fixed;");
  document.body.appendChild(modal);

  let iframe = document.createElement('iframe')
  iframe.id = 'blockit-iframe'
  iframe.src = chrome.extension.getURL("index.html");
  iframe.style.width = '100%'
  iframe.style.height = '100%'
  iframe.style.border = '0px'
  modal.appendChild(iframe);
}

chrome.runtime.onMessage.addListener(request => {
  console.log('request', request);
  if (request.type === 'getIntoYoutubeVideo') {
    console.log(request.type);
    console.log('DOM', document);
    
    if (document.getElementById('modal') == null) {
      addModalToDOM();
    }
    chrome.runtime.sendMessage(
      chrome.runtime.id, 
      {type: 'updateVideoId', videoId: request.videoId }
    );
  }
  if (request.type === 'doneUpdateCategoryId') {
    const modal = document.getElementById('modal');
    console.log('modal open?', modal.open);
    if (modal) {
      modal.showModal();
    }
  }
  if (request.type === 'closeIframe') {
    console.log(request.type);
    if (request.didClick === 'True') {
      const modal = document.getElementById('modal');

      if (modal.open) {
        modal.close();
      }
    }
  }
});