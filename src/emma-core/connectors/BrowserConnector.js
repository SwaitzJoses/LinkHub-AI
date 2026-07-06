// BrowserConnector.js
// Emma browsing sense


import BaseConnector
from "./BaseConnector";


class BrowserConnector extends BaseConnector {


constructor(){

super("browser");

}




normalize(activity){


return {


type:
"BROWSER_ACTIVITY",


object:
"webpage",


businessId:
activity.businessId || "user",


data:{


url:
activity.url,


title:
activity.title,


content:
activity.content,


visitedAt:
new Date()


}


};


}




getCapabilities(){


return [

"browser_awareness",
"research_context",
"web_memory"

];

}



}



export default BrowserConnector;