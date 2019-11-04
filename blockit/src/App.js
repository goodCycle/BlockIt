/* global chrome */

import React, { Component } from 'react';
import { Container, Button, Badge, Col, Row } from 'react-bootstrap';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: null,
      videoId: null,
      isLoaded: false,
    }
  }

  componentDidMount() {
    // chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    //   const url = new URL(tabs[0].url);
    //   this.setYoutubeVideoId(url);
    //   this.getCategoryId();
    // });
    //chrome.runtime.onMessage.addListener(this.handleMessage);
  }

  // handleMessage = (request) => {
  //   if (request.type === 'getIntoYoutubeVideo') {
  //     this.setState({ videoId: request.videoId, isLoaded: true });
  //     this.getCategoryId();
  //   }
  // }

  // unmount할 때는 더해준 리스너 빼주기....
  // componentWillUnmount() {
  //   chrome.runtime.onMessage.removeListener(this.handleMessage);
  // }
  // setYoutubeVideoId = (url) =>  {
  //   if (url.hostname === 'www.youtube.com' && url.search !== '') {
  //     var videoId = url.search.split('v=')[1];
  //     var ampersandPosition = videoId.indexOf('&');
  //     if(ampersandPosition !== -1) {
  //       videoId = videoId.substring(0, ampersandPosition);
  //     }
  //     console.log('videoID is ', videoId);
  //     this.setState({ videoId: videoId })
  //   }
  // }

  getCategoryId = () => {
    const youtubeVideoInfoUrl = 'https://www.googleapis.com/youtube/v3/videos';
    axios.get(youtubeVideoInfoUrl, {
      params: {
        part: 'snippet',
        id: this.state.videoId,
        key: 'AIzaSyDvh_LgkZuQxxAg2tvCN_DHKsrU8STK_jo'
      }})
    .then(result => {
      var categoryId = result.data.items[0].snippet.categoryId;
      this.setState({ categoryId })
    }).catch(error => {
      console.log('Error in get youtube video info', error);
    });
  }

  onCloseIframe = () => {
    chrome.tabs.query({active: true, currentWindow: true, status: 'complete'}, tabs => {
      console.log('tabs in close', tabs);
      chrome.tabs.sendMessage(tabs[0].id, { type: 'closeIframe', didClick: 'True' });
    });
  }

  render() {
    let categoryNames = ['', 'Film & Animation', 'Autos & Vehicles', '', '', '', '', '', '', '', 'Music', '', '', '', '', 'Pets & Animals', '', 'Sports', 'Short Movies', 'Travel & Events', 'Gaming', 'Videoblogging', 'People & Blogs', 'Comedy', 'Entertainment', 'News & Politics', 'Howto & Style', 'Education', 'Science & Technology', 'Nonprofits & Activism', 'Movies', 'Anime/Animation', 'Action/Adventure', 'Classics', 'Comedy', 'Documentary', 'Drama', 'Family', 'Foreign', 'Horror', 'Sci-Fi/Fantasy', 'Thriller', 'Shorts', 'Shows', 'Trailers']

    return (
      <Container>
        <Row className="justify-content-end">
          <Button
            variant="light"
            size="sm"
            onClick={() => this.onCloseIframe()} 
          >
            X
          </Button>
        </Row>
        <Row className="justify-content-center">
          <h1><Badge variant="danger">BLOCK IT</Badge></h1>
        </Row>
        <Row className="justify-content-center">
          <h3>
            Category ID is: {categoryNames[this.state.categoryId]}
          </h3>
        </Row>
      </Container> 
    );
  }
}

chrome.runtime.onMessage.addListener(request => {
  console.log('App updateVideoId on!');
  if (request.type === 'updateVideoId') {
    this.setState({ videoId: request.videoId, isLoaded: true });
    this.getCategoryId();
  }
  // update가 안된다 이말씀..modal을 재활용하고 싶다고..
});

export default App;