import LLMAdapter from "../connectors/LLMAdapter";

import OpenAIConnector from "../connectors/OpenAIConnector";

// import ClaudeConnector from "../connectors/ClaudeConnector";

import GeminiConnector from "../connectors/GeminiConnector";

async function testLLMs(){

    console.log("=================================");
    console.log("Emma LLM Connector Test");
    console.log("=================================");

    // -------------------------
    // OpenAI
    // -------------------------

    const openai = new OpenAIConnector(

        import.meta.env.VITE_OPENAI_API_KEY

    );

    const openaiResponse = await openai.generate([

        {

            role:"user",

            content:"Say Hello from OpenAI."

        }

    ]);

    console.log("OpenAI");

    console.log(

        openaiResponse
        .choices[0]
        .message
        .content

    );



    // -------------------------
    // Gemini
    // -------------------------

    const gemini = new GeminiConnector(

        import.meta.env.VITE_GEMINI_API_KEY

    );

    const geminiResponse = await gemini.generate([

        {

            role:"user",

            content:"Say Hello from Gemini."

        }

    ]);

    console.log("Gemini");

    console.log(

        geminiResponse
        .choices[0]
        .message
        .content

    );

}

testLLMs();