import { GoogleGenerativeAI }
from "@google/generative-ai";

class GeminiConnector {

    constructor(apiKey, model = "gemini-2.5-pro") {

        this.model = model;

        this.client =
            new GoogleGenerativeAI(apiKey);

        console.log(
            "🤖 Gemini Connector Ready"
        );

        console.log(
            "🧠 Model:",
            this.model
        );

    }

    async generate(messages = []) {

        const model =
            this.client.getGenerativeModel({

                model: this.model

            });

        const prompt = messages
            .map(message => message.content)
            .join("\n\n");

        const result =
            await model.generateContent(

                prompt,

                {

                    temperature: 0.2,

                    maxOutputTokens: 600

                }

            );

        const response =
            await result.response;

        return {

            choices: [

                {

                    message: {

                        content:
                            response.text()

                    }

                }

            ]

        };

    }

}

export default GeminiConnector;