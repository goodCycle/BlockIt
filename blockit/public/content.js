chrome.runtime.onMessage.addListener(request => {
  console.log('request', request);
  if (request.type === 'urlUpdate') {
    console.log('urlUpdate!');
    const url = request.url;
    const isYoutube = url.includes('www.youtube.com');
    console.log('url split', url.split('v=')[1]);
    const hasVideoId = url.split('v=')[1] !== undefined;
    if (isYoutube && hasVideoId) {
      const modal = document.createElement('dialog');
      modal.setAttribute("style", "height:60%; width: 60%");
      document.body.appendChild(modal); ////

      let iframe = document.createElement('iframe')
      iframe.id = 'blockit-iframe'
      iframe.src = chrome.extension.getURL("index.html");
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.border = '0px'
      modal.appendChild(iframe);
      
      if (!modal.open) {
        modal.showModal();
      }
    }
  }
  if (request.type === 'closeIframe') {
    if (request.didClick === 'True') {
      const modal = document.querySelector('dialog');
      if (modal.open) {
        modal.close()
      }
    }
  }
});

//TODO: 모달을 닫게 만들기
// 1. 유저가 모달 밖의 공간을 터치
// 2. 리액트로 dialog의 닫는 권한을 넘겨서 닫을 수 있도록 