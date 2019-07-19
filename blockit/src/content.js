/* src/content.js */
/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";

class Main extends React.Component {
  render() {
    return (
      <Frame head={[
        <link
          type="text/css"
          rel="stylesheet"
          href={chrome.runtime.getURL("/static/css/content.css")}
        >
        </link>]
      }>
        <FrameContextConsumer>
          {
          // Callback is invoked with iframe's window and document instances
          ({document, window}) => {
            // Render Children
            var url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=HTDuhLv3GOM&key=AIzaSyDvh_LgkZuQxxAg2tvCN_DHKsrU8STK_jo"
            var categoryId = "hoo"
            return (
              <div className="my-extension">
                <button 
                  onClick={() => {
                    // sendHttpRequest(url);
                    categoryId = sendHttpRequest(url);
                  }}
                >
                  Click!
                </button>
                <h1>{categoryId}</h1>
              </div>
            )}
          } 
        </FrameContextConsumer> 
      </Frame>
    )
  }
}

const app = document.createElement('div');
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action") {
      toggle();
    }
  }
);

function requestCategoryId () {
  // alert(JSON.parse(this.responseText));
  var result = JSON.parse(this.responseText);
  var categoryId = result.items[0].snippet.categoryId;
  console.log(categoryId);
  return categoryId;
}

function sendHttpRequest (url) {
  var onRequest = new XMLHttpRequest();
  onRequest.addEventListener("load", requestCategoryId);
  onRequest.open("GET", url);
  onRequest.send();
}

function toggle(){
  if(app.style.display === "none"){
    app.style.display = "block";
  } else{
    app.style.display = "none";
  }
}
