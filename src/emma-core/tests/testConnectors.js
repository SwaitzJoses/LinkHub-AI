import OpenAIConnector from "../connectors/OpenAIConnector";
import ClaudeConnector from "../connectors/ClaudeConnector";
import GeminiConnector from "../connectors/GeminiConnector";

import GitHubConnector from "../connectors/GitHubConnector";
import VSCodeConnector from "../connectors/VSCodeConnector";
import CursorConnector from "../connectors/CursorConnector";

async function testConnectors(){

    console.log("");
    console.log("==================================");
    console.log("      EmmaIQ Connector Test");
    console.log("==================================");

    // ==========================
    // AI CONNECTORS
    // ==========================

    try{

        new OpenAIConnector(

            import.meta.env.VITE_OPENAI_API_KEY

        );

        console.log("🤖 OpenAI      ✅ Ready");

    }

    catch{

        console.log("🤖 OpenAI      ❌ Failed");

    }


    try{

        new ClaudeConnector(

            import.meta.env.VITE_CLAUDE_API_KEY

        );

        console.log("🤖 Claude      ✅ Ready");

    }

    catch{

        console.log("🤖 Claude      ❌ Failed");

    }


    try{

        new GeminiConnector(

            import.meta.env.VITE_GEMINI_API_KEY

        );

        console.log("🤖 Gemini      ✅ Ready");

    }

    catch{

        console.log("🤖 Gemini      ❌ Failed");

    }


    // ==========================
    // PRODUCT CONNECTORS
    // ==========================

    try{

        new GitHubConnector(

            import.meta.env.VITE_GITHUB_TOKEN

        );

        console.log("💻 GitHub      ✅ Ready");

    }

    catch{

        console.log("💻 GitHub      ❌ Failed");

    }


    try{

        new VSCodeConnector();

        console.log("💻 VS Code     ✅ Ready");

    }

    catch{

        console.log("💻 VS Code     ❌ Failed");

    }


    try{

        new CursorConnector();

        console.log("💻 Cursor      ✅ Ready");

    }

    catch{

        console.log("💻 Cursor      ❌ Failed");

    }

    console.log("----------------------------------");
    console.log("EmmaIQ MVP Backend Ready 🚀");
    console.log("==================================");
    console.log("");

}

testConnectors();