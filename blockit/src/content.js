/* src/content.js */
/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
//import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import "./content.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '/https://www.googleapis.com/youtube/v3/videos?part=snippet&id=HTDuhLv3GOM&key=AIzaSyDvh_LgkZuQxxAg2tvCN_DHKsrU8STK_jo',
      categoryId: 'hoo'
    };
  }

  requestCategoryId = (result) => {
    var categoryId = result.items[0].snippet.categoryId;
    this.setState({ categoryId });
  }
  
  render() {
    console.log('rendering...');
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
                    console.log('click!', this.state.url)
                    fetch(this.state.url, {
                      method: "GET",
                    })
                    .then((response) => {
                      if (!response.ok) throw response.statusText;
                      return response.json();
                    })
                    // .then((text) => console.log(text))
                    .then((responseAsJson) => this.requestCategoryId(responseAsJson))
                    .catch((error) => console.log(error));
                  }}
                >
                  Click!
                </button>
                <h1>{this.state.categoryId}</h1>
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
      // alert("clicked browser!");
      toggle();
    }
  }
);

function toggle(){
  if(app.style.display === "none"){
    app.style.display = "block";
  } else{
    app.style.display = "none";
  }
}

// yarn start, yarn build
// load chrome extensions again
// load localhost:3000 and click the icon
