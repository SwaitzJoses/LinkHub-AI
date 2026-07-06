// DriveConnector.js
// Emma file sense


import BaseConnector
from "./BaseConnector";


class DriveConnector extends BaseConnector {


constructor(){

super("drive");

}



normalize(file){


return {


type:
"FILE_UPDATED",


object:
"document",


businessId:
file.businessId || "user",


data:{


name:
file.name,


type:
file.type,


content:
file.content,


updatedAt:
new Date()


}


};


}



getCapabilities(){


return [

"read_files",
"understand_documents",
"remember_documents"

];

}



}



export default DriveConnector;