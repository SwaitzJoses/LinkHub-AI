import OpenAI from "openai";


class OpenAIConnector {

  constructor(apiKey){

    this.client = new OpenAI({

       apiKey,

    dangerouslyAllowBrowser: true


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

            messages,

       

max_completion_tokens: 600
        });

    return response;

}

}

export default OpenAIConnector;