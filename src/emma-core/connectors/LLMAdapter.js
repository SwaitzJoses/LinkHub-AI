class LLMAdapter {

    constructor(){

        this.provider = null;

        console.log(
            "🧠 LLM Adapter Ready"
        );

    }

    setProvider(provider){

        this.provider = provider;

    }

    async generate(messages = []){

        if(!this.provider){

            throw new Error(
                "No LLM provider selected."
            );

        }

        return await this.provider.generate(
            messages
        );

    }

}

export default LLMAdapter;