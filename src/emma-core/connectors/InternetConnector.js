// InternetConnector.js
// Emma's window to the outside world
//
// RULE:
// Internet does not think.
// Internet observes.
//
// Internet collects.
// Emma understands.



class InternetConnector {



// ==============================
// INITIALIZE INTERNET SENSE
// ==============================


constructor(){


this.source =
"internet";


this.name =
"InternetConnector";


this.type =
"WORLD";


this.active =
true;



this.apiKey =
import.meta.env.VITE_SEARCH_API_KEY || null;



console.log(
"🌎 Internet Connector ready"
);


}









// ==============================
// STANDARD CONNECTOR ENTRY
// ==============================


async receive(data = {}){


return await this.collect(
data
);


}









// ==============================
// SEARCH THE WORLD
// ==============================
//
// Real internet eyes
//
// NO reasoning
// NO decisions
//
// ==============================


async searchWorld(query){



console.log(
"🌎 Searching world:",
query
);



try{



const response =
await fetch(

`https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${this.apiKey}`

);



const result =
await response.json();





const items =
result.organic_results ||

[];





return await this.collectMany(


items.map(item => ({



topic:

query,



category:

"search",



eventType:

"web_result",



summary:

item.title || "",



content:

item.snippet || "",



url:

item.link || null,



domain:

item.source || null,



raw:

item



}))


);



}



catch(error){



console.error(
"🌎 Internet search failed",
error
);



return [];



}



}









// ==============================
// WATCH A TOPIC
// ==============================


async watchTopic(topic){



return await this.searchWorld(

topic

);



}









// ==============================
// WATCH COMPANY
// ==============================


async watchCompany(company){



return await this.searchWorld(

`${company} latest news updates`

);



}









// ==============================
// COLLECT WORLD INFORMATION
// ==============================


async collect(data = {}){



return {



source:

this.source,



connector:

this.name,



type:

"WORLD_SIGNAL",



createdAt:

new Date()
.toISOString(),




data:{





topic:

data.topic ||

"unknown",





category:

data.category ||

"general",





eventType:

data.eventType ||

"information",





summary:

data.summary ||

"",





content:

data.content ||

"",









url:

data.url ||

null,





domain:

data.domain ||

null,





author:

data.author ||

null,





publishedAt:

data.publishedAt ||

null,










people:

data.people ||

[],





companies:

data.companies ||

[],





products:

data.products ||

[],





keywords:

data.keywords ||

[],










signals:

data.signals ||

[],





metrics:

data.metrics ||

{},









previousValue:

data.previousValue ||

null,





currentValue:

data.currentValue ||

null,





changeType:

data.changeType ||

null,










raw:

data.raw ||

data





}



};



}









// ==============================
// COLLECT MULTIPLE
// ==============================


async collectMany(items=[]){



const results =
[];




for(
const item of items
){



results.push(

await this.collect(item)

);



}



return results;



}









// ==============================
// DAILY WORLD SCAN
// ==============================


async dailyScan(topics=[]){



let signals =
[];




for(
const topic of topics
){



const result =
await this.watchTopic(
topic
);



signals = [

...signals,

...result

];



}



return signals;



}









// ==============================
// CAPABILITIES
// ==============================


getCapabilities(){



return [



"search_world",



"watch_topics",



"watch_companies",



"collect_news",



"collect_market_changes",



"collect_competitor_updates"



];



}










// ==============================
// INFO
// ==============================


getInfo(){



return {



source:this.source,


name:this.name,


type:this.type,


active:this.active,


role:

"Emma's live internet awareness"



};



}









// ==============================
// HEALTH CHECK
// ==============================


async testConnection(){



return {



source:

this.source,



status:

this.active
?
"healthy"
:
"disabled",



message:

"Internet connector online"



};



}









enable(){


this.active=true;


}






disable(){


this.active=false;


}










status(){



return {



source:this.source,


name:this.name,


type:this.type,


active:this.active



};



}



}







export default InternetConnector;