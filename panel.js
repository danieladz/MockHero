// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*
document.addEventListener("click", handleClick, false);

function handleClick(event) {
	if (event.target.className=="button-show-content") {
    document.querySelector('#img').style.display = 'none';
    document.querySelector('#dataDiv').style.visibility = 'visible';
  	// sendObjectToInspectedPage({action: "code", content: "console.log('"+event.target.dataset.content+"')"});
    document.querySelector('#dataDiv').innerHTML = "<div style=\"word-wrap: break-word;color:white;\">"+ event.target.dataset.content  +"</div>";
  }
}

chrome.devtools.network.onRequestFinished.addListener(
  function(request) {
  	if (request.response.content.mimeType == "application/json") {
  		request.getContent(function(body){
  			var postData = request.request.postData.params,
            data = {};

        for (var i = 0; i < postData.length; i++) {
          if(postData[i].value.indexOf('%') >= 0){
           postData[i].value = postData[i].value.replace(/%/g, ",");
          }
          data[postData[i].name] = postData[i].value;
        };

			  var mockObject = {
              request: {
                path: request.request.url.split(':')[2].substring(4),
                method: request.request.method,
              },
              response: {
                data: JSON.parse(body)
              }
            };
        mockObject.request.data = data;

  			sendObjectToInspectedPage({action: "code", content: mockObject});
  			chrome.extension.sendMessage({name: JSON.stringify(request.request.url), content: JSON.stringify(mockObject)}, function(message){});
	    });
  	}
  }
);
