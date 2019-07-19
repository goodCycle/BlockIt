function reqListener () {
  // alert(JSON.parse(this.responseText));
  var result = JSON.parse(this.responseText);
  var categoryId = result.items[0].snippet.categoryId;
  console.log(categoryId);
}
  
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", url);
oReq.send();