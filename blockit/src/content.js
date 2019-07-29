/* src/content.js */
/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import "./content.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=HTDuhLv3GOM&key=AIzaSyDvh_LgkZuQxxAg2tvCN_DHKsrU8STK_jo',
      categoryId: 'hoo'
    };
  }

  requestCategoryId = () => {
    // alert(JSON.parse(this.responseText));
    var result = JSON.parse(this.responseText);
    var categoryId = result.items[0].snippet.categoryId;
    console.log(categoryId);
    return categoryId;
  }
  
  sendHttpRequest = (url) => {
    // TODO: 이 코드를 프로미스를 사용해서 바꾸기
    // https://medium.com/@kiwanjung/%EB%B2%88%EC%97%AD-async-await-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90-promise%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-955dbac2c4a4
    var onRequest = new XMLHttpRequest();
    onRequest.addEventListener("load", requestCategoryId);
    onRequest.open("GET", url);
    onRequest.send();
  }

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

sendHttpRequest (url) => {
  var onRequest = new XMLHttpRequest();
  onRequest.addEventListener("load", requestCategoryId);
  onRequest.open("GET", url);
  onRequest.send();
};

function toggle(){
  if(app.style.display === "none"){
    app.style.display = "block";
  } else{
    app.style.display = "none";
  }
}
