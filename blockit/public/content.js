chrome.runtime.onMessage.addListener(request => {
  if (request.type = 'urlUpdate') {
    const url = request.url;
    const isYoutube = url.includes('www.youtube.com');
    console.log('url split', url.split('v=')[1]);
    const hasVideoId = url.split('v=')[1] !== undefined;
    if (isYoutube && hasVideoId) {
      const modal = document.createElement('dialog');
      modal.setAttribute("style", "height:60%; width: 60%");
      modal.innerHTML =
        `<iframe id="BlockIt" style="height:100%"></iframe>
          <div style="position:absolute; top:0px; left:5px;">  
            <button style="align-center: 'center'">x</button>
          </div>`;
      document.body.appendChild(modal);
      const dialog = document.querySelector("dialog");
      if (!dialog.open) {
        dialog.showModal();
      }
      
      const iframe = document.getElementById("BlockIt");
      iframe.src = chrome.extension.getURL("index.html");
      iframe.frameBorder = 0;
      
      dialog.querySelector("button").addEventListener("click", () => {
        dialog.close();
      })
    }
  }
});
