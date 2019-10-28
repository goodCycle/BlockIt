/* global chrome */

import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: null,
      videoId: null
    }
  }

  componentDidMount() {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      const url = new URL(tabs[0].url);
      this.setYoutubeVideoId(url);
      this.getCategoryId();
    });
  }
  // unmount할 때는 더해준 리스너 빼주기....

  setYoutubeVideoId = (url) =>  {
    if (url.hostname === 'www.youtube.com' && url.search !== '') {
      var videoId = url.search.split('v=')[1];
      var ampersandPosition = videoId.indexOf('&');
      if(ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
      console.log('videoID is ', videoId);
      this.setState({ videoId: videoId })
    }
  }

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
    console.log('onCloseIframe');
    // console.log('window.parent', window.parent);
    // console.log('window.parent.document', window.parent.document);
    // console.log('window.parent.document.getElementById', window.document.getElementById('dialog'));
    chrome.tabs.query({active: true, currentWindow: true, status: 'complete'}, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'closeIframe', didClick: 'True' });
    });
  }

  render() {
    let categoryNames = ['', 'Film & Animation', 'Autos & Vehicles', '', '', '', '', '', '', '', 'Music', '', '', '', '', 'Pets & Animals', '', 'Sports', 'Short Movies', 'Travel & Events', 'Gaming', 'Videoblogging', 'People & Blogs', 'Comedy', 'Entertainment', 'News & Politics', 'Howto & Style', 'Education', 'Science & Technology', 'Nonprofits & Activism', 'Movies', 'Anime/Animation', 'Action/Adventure', 'Classics', 'Comedy', 'Documentary', 'Drama', 'Family', 'Foreign', 'Horror', 'Sci-Fi/Fantasy', 'Thriller', 'Shorts', 'Shows', 'Trailers']

    return (
      <Container>
        <div className="App">
          <h1 className="App-title">Block It</h1>
          <h3>
            Category ID is: <br></br>
            <br></br>
            {categoryNames[this.state.categoryId]}
          </h3>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => this.onCloseIframe()} 
        >
          X
        </Button>
      </Container> 
    );
  }
}

export default App;