var your_xplex_token = "xxxxxxxxxxxxxxxxxxx";


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	
    if (changeInfo.url && changeInfo.url.includes(":32400/web") && changeInfo.url.includes("folder%3Fparent")) {
        console.log('Tab %d got new URL: %s', tabId, changeInfo.url);
		
		
		var func = `
		function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
		
	
		var nodes = document.querySelectorAll('[class^="MetadataItemLinkUnderlay"]');
		var count = 0;
		
		var checkExist = setInterval(function() {
			
			nodes = document.querySelectorAll('[class^="MetadataItemLinkUnderlay"]');
   if (nodes.length > 0) {
      console.log("Metadata Element Found!");
      clearInterval(checkExist);
	  
	  nodes.forEach(e => e.nextSibling.innerHTML = e.nextSibling.innerHTML.replace('</span></div><div class=', ' · ' + httpGet("http://127.0.0.1:32400/library/metadata/" + e.href.split("metadata%2F")[1].split("&")[0] + "?X-Plex-Token=${your_xplex_token}").split(" file=")[1].split(" size=")[0] + '</span></div><div class='));
	  
	  
	  
	  
	  
   }
   else {
	   count++;
	   if (count > 100)
	   {
		   clearInterval(checkExist);
		   console.log("No Metadata Element Found after 100 tries! Cleared Interval!");
	   }
	   console.log("No Metadata Element Found! Searching Again... This is try " + count + " of 100");
   }
}, 100); // check every 100ms
		
		
`;


		
		
		
				chrome.tabs.executeScript(tabId, { code: func });
				
						



    }
});

