import OpenAI from "openai";

class OpenAIConnector {

    constructor(apiKey, model = "gpt-5.5") {

        this.model = model;

        this.client = new OpenAI({

            apiKey,

            dangerouslyAllowBrowser: true

        });

        console.log(
            "🤖 OpenAI Connector Ready"
        );

        console.log(
            "🧠 Model:",
            this.model
        );

    }

    async generate(messages = []) {

        if (!Array.isArray(messages)) {

            throw new Error(
                "Messages must be an array."
            );

        }

        const response =
            await this.client.chat.completions.create({

                model: this.model,

                messages,

                max_completion_tokens: 600

            });

        return response;

    }

}

export default OpenAIConnector;