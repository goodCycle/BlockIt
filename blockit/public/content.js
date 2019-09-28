chrome.runtime.onMessage.addListener(request => {
  if (request.type = 'urlUpdate') {
    const url = request.url;
    const isYoutube = url.includes('www.youtube.com');
    console.log('url split', url.split('v=')[1]);
    const hasVideoId = url.split('v=')[1] !== undefined;
    if (isYoutube && hasVideoId) {
      const modal = document.createElement('dialog');
      modal.setAttribute("style", "height:60%; width: 60%");
      document.body.appendChild(modal); ////

      let iframe = document.createElement('iframe')
      iframe.src = chrome.extension.getURL("index.html");

      iframe.id = 'blockit-iframe'
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.border = '0px'

      // window.onload = () => {
      //   document.body.appendChild(iframe)
      // }
      modal.appendChild(iframe);
      modal.showModal();
      // modal.innerHTML =
      //   `<iframe id="BlockIt" style="height:100%; width:100%"></iframe>
      //   <div style="position:absolute; top:0px; left:5px; align-items: 'center'; width: 30px; height: 30px">  
      //     <button style="align-center: 'center'">x</button>
      //   </div>`;
      // document.body.appendChild(modal);
      
      // const dialog = document.querySelector('dialog'); //Q: 왜 여기서 getElementByID가 안되는 것일까?
      // if (!dialog.open) {
      //   dialog.showModal();
      // }
      
      // const iframe = document.getElementById("BlockIt");
      // iframe.src = chrome.extension.getURL("index.html");
      // // iframe.frameBorder = 0;
      
      // dialog.querySelector("button").addEventListener("click", () => {
      //   dialog.close();
      // })
    }
  }
});

//TODO: 모달을 닫게 만들기
// 1. 유저가 모달 밖의 공간을 터치
// 2. 리액트로 dialog의 닫는 권한을 넘겨서 닫을 수 있도록