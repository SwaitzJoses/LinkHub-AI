import Anthropic from "@anthropic-ai/sdk";

class ClaudeConnector {

    constructor(apiKey, model = "claude-sonnet-4") {

        this.model = model;

        this.client = new Anthropic({

            apiKey,
            dangerouslyAllowBrowser: true

        });

        console.log(
            "🤖 Claude Connector Ready"
        );

        console.log("🧠 Model from settings:", this.model);
        console.log("API Key starts with:", apiKey.substring(0, 15));

    }

    async generate(messages = []) {

        const system =

            messages.find(
                m => m.role === "system"
            )?.content || "";

        const user =

            messages
                .filter(m => m.role !== "system")
                .map(m => m.content)
                .join("\n\n");

   const response =
    await this.client.messages.create({

        model: this.model,

        max_tokens: 4000,

        system,

        messages: [
            {
                role: "user",
                content: user
            }
        ]

    });

console.log("CLAUDE RESPONSE:");
console.log(response);

        return {

            choices: [

                {

                    message: {

                        content: response.content
    .filter(block => block.type === "text")
    .map(block => block.text)
    .join("\n")

                    }

                }

            ]

        };

    }

}

export default ClaudeConnector;