chrome.runtime.onMessage.addListener(request => {
  if (request.type === 'getHeadlines') {
    console.log('getHeadlines here!!!')
    const modal = document.createElement('dialog');
    modal.setAttribute("style", "height:40%");
    modal.innerHTML =
      `<iframe id="headlineFetcher" style="height:100%"></iframe>
        <div style="position:absolute; top:0px; left:5px;">  
          <button>x</button>
        </div>`;
    document.body.appendChild(modal);
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    
    const iframe = document.getElementById("headlineFetcher");
    iframe.src = chrome.extension.getURL("index.html");
    iframe.frameBorder = 0;
    
    dialog.querySelector("button").addEventListener("click", () => {
      dialog.close();
    })
  }

  if (request.type = 'urlUpdate') {
    console.log('urlUpdate', request);
    const url = request.url;
    const isYoutube = url.includes('www.youtube.com');
    const hasVideoId = url.split('v=')[1] !== undefined;
    if (isYoutube && hasVideoId) {
      const modal = document.createElement('dialog');
      modal.setAttribute("style", "height:40%");
      modal.innerHTML =
        `<iframe id="headlineFetcher" style="height:100%"></iframe>
          <div style="position:absolute; top:0px; left:5px;">  
            <button>x</button>
          </div>`;
      document.body.appendChild(modal);
      const dialog = document.querySelector("dialog");
      dialog.showModal();
      
      const iframe = document.getElementById("headlineFetcher");
      iframe.src = chrome.extension.getURL("index.html");
      iframe.frameBorder = 0;
      
      dialog.querySelector("button").addEventListener("click", () => {
        dialog.close();
      })
    }
  }
});
