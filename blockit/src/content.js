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
      url: '/https://www.googleapis.com/youtube/v3/videos?part=snippet&id=9YifCshtOqg&key=AIzaSyDvh_LgkZuQxxAg2tvCN_DHKsrU8STK_jo',
      categoryId: 'hoo'
    };
  }

  componentDidMount = () => {
    window.addEventListener('click', this.searchVideoID);
  }

  componentWillUnmount = () => {
    window.removeEventListener('click', this.searchVideoID);
  }

  searchVideoID = () =>  {
    if (window.location.hostname === 'www.youtube.com' && window.location.search !== '') {
      var video_id = window.location.search.split('v=')[1];
      var ampersandPosition = video_id.indexOf('&');
      if(ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      console.log('videoID is ', video_id);
    }
  }

  requestCategoryId = (result) => {
    console.log(result);
    var categoryId = result.data.items[0].snippet.categoryId;
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
                    //console.log('click!', this.state.url)
                    
                    fetch('/youtube/get-category-id', {
                      headers:{
                        "accepts":"application/json"
                      }
                    })
                    .then((response) => response.json())
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
