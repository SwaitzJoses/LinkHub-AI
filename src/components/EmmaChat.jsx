import "../styles/EmmaChat.css";
import { useState } from "react";

function EmmaChat() {

    const [message, setMessage] = useState("");

    const suggestions = [
        "Create Poster",
        "Write Caption",
        "WhatsApp Campaign",
        "Marketing Ideas"
    ];

    const handleSuggestion = (text) => {
        setMessage(text);
    };

    const handleSend = () => {

        if (!message.trim()) return;

        console.log(message);

        // OpenAI comes later

    };

    return (

        <div className="emma-chat">

            <div className="emma-chat-header">

                <div>

                    <h2>🤖 Emma AI</h2>

                    <p>
                        What would you like to create today?
                    </p>

                </div>

                <span className="online">
                    ● Online
                </span>

            </div>

            <div className="emma-input">

                <input
                    type="text"
                    placeholder="Ask Emma anything..."
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                />

                <button onClick={handleSend}>
                    ➜
                </button>

            </div>

            <div className="emma-suggestions">

                {suggestions.map((item,index)=>(

                    <button
                        key={index}
                        onClick={()=>handleSuggestion(item)}
                    >
                        {item}
                    </button>

                ))}

            </div>

        </div>

    );

}

export default EmmaChat;