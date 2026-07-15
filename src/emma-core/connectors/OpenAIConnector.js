import OpenAI from "openai";


class OpenAIConnector {

  constructor(apiKey){

    this.client = new OpenAI({

        apiKey

    });

    console.log(
        "🤖 OpenAI Connector Ready"
    );

}

  async generate(
    messages = []
){

    const response =

        await this.client.chat.completions.create({

            model: "gpt-5.5",

            messages

        });

    return response;

}

}

export default OpenAIConnector;