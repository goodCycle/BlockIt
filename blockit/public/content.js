chrome.runtime.onMessage.addListener(request => {
  console.log('request', request);
  if (request.type === 'getIntoYoutubeVideo') {
    console.log(request.type);
    console.log('DOM', document);
    console.log('modal is here?', document.getElementById('modal'));
    if (document.getElementById('modal') == null) {
      const modal = document.createElement('dialog');
      modal.id = 'modal';
      modal.setAttribute("style", "height:60%; width: 60%; position: fixed;");
      document.body.appendChild(modal); ////

      let iframe = document.createElement('iframe')
      iframe.id = 'blockit-iframe'
      iframe.src = chrome.extension.getURL("index.html");
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.border = '0px'
      modal.appendChild(iframe);

      if (!modal.open) {
        console.log('show modal');
        modal.showModal();
      }
    }
}
  if (request.type === 'closeIframe') {
    console.log(request.type);
    if (request.didClick === 'True') {
      const modal = document.getElementById('modal');
      // modal이 떠 있어도 close가 안 되는 경우가 있음
      console.log('modal open?', modal.open);
      if (modal.open) {
        modal.close();
        modal.remove();
      }
    }
  }
});

//TODO: 모달을 닫게 만들기
// 1. 유저가 모달 밖의 공간을 터치
// 2. 리액트로 dialog의 닫는 권한을 넘겨서 닫을 수 있도록 