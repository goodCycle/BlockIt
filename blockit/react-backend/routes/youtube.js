const fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

router.get('/get-category-id', (req, res) => {
  // '/https://www.googleapis.com/youtube/v3/videos?part=snippet&id=9YifCshtOqg&key=AIzaSyDvh_LgkZuQxxAg2tvCN_DHKsrU8STK_jo'
  const youtubeVideoURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=';
  const apiKey = '&key=AIzaSyDvh_LgkZuQxxAg2tvCN_DHKsrU8STK_jo';
  const videoID = '9YifCshtOqg';

  const categoryIdURL = (youtubeURL, apiKey, videoID) => {
    let newUrl = youtubeURL + videoID + apiKey;
    return newUrl;
  };	

  const apiUrl = categoryIdURL(youtubeVideoURL, apiKey, videoID);

  fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    res.send({ data });
  })
  .catch((error) => console.log(error));
});

module.exports = router;