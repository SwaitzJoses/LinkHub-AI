import Anthropic from "@anthropic-ai/sdk";


class ClaudeConnector {

  constructor(apiKey){
this.client = new Anthropic({

    apiKey

});

   console.log(
    "🤖 Claude Connector Ready"
);

}

async generate(
    messages = []
){

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

            model: "claude-sonnet-4",

            max_tokens: 600,

            system,

            messages: [

                {

                    role: "user",

                    content: user

                }

            ]

        });

    return {

        choices: [

            {

                message: {

                    content:

                        response.content[0].text

                }

            }

        ]

    };

}

}

export default ClaudeConnector;