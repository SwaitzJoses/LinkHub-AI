// import LLMAdapter from "./connectors/LLMAdapter";

// import OpenAIConnector from "./connectors/OpenAIConnector";

// import ClaudeConnector from "./connectors/ClaudeConnector";

// import GeminiConnector from "./connectors/GeminiConnector";



// class EmmaBootstrap {



//     createAI(settings = {}){

// const ai = new LLMAdapter();


// switch(settings.preferredLLM){

//     case "claude":

//     ai.setProvider(

//         new ClaudeConnector(

//             settings.claudeKey

//         )

//     );

//     break;

//    case "gemini":

//     ai.setProvider(

//         new GeminiConnector(

//             settings.geminiKey

//         )

//     );

//     break;

//     default:

//     ai.setProvider(

//         new OpenAIConnector(

//             settings.openaiKey

//         )

//     );

//     break;

// }

// return ai;

//     }



// }

// export default EmmaBootstrap;