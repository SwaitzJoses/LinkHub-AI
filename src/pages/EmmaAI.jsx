import "../styles/EmmaAI.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ProductSelector from "../components/ProductSelector";
import EmmaInsightCard from "../components/EmmaInsightCard";
import { getEmmaInsight } from "../utils/EmmaInsights";

import {
  FiArrowLeft,
  FiSend,
  FiPaperclip,
  FiImage,
  FiMessageCircle,
  FiTrendingUp,
  FiTag,
  FiEdit3,
  FiZap,
} from "react-icons/fi";

function EmmaAI() {

  const navigate = useNavigate();

  const bottomRef = useRef(null);

  const fileInputRef = useRef(null);

  const [input, setInput] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [uploadPreview, setUploadPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [pageViews, setPageViews] = useState(0);
  const [productViews, setProductViews] = useState(0);

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "emma",
      text:
        "Hi Swaitz 👋\n\nI'm Emma.\n\nYour AI Marketing Assistant.\n\nAsk me anything about marketing, posters, captions, WhatsApp campaigns or growing your business.",
    },
  ]);
  const [showProducts, setShowProducts] = useState(false);
  const [insight, setInsight] = useState("");

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  const suggestions = [

    {
      icon: <FiImage />,
      label: "Create Poster",
      prompt: "Create a premium poster for my newest product.",
    },

    {
      icon: <FiMessageCircle />,
      label: "WhatsApp",
      prompt: "Write a WhatsApp promotion.",
    },

    {
      icon: <FiTrendingUp />,
      label: "Increase Sales",
      prompt: "How can I increase today's sales?",
    },

    {
      icon: <FiTag />,
      label: "Festival",
      prompt: "Create a festival campaign.",
    },

    {
      icon: <FiEdit3 />,
      label: "Caption",
      prompt: "Write an Instagram caption.",
    },

    {
      icon: <FiZap />,
      label: "Ideas",
      prompt: "Give me marketing ideas.",
    },

  ];

useEffect(() => {
  fetchProducts();
  fetchPageViews();
  fetchProductViews();

  
 
}, []);


useEffect(() => {

  const result = getEmmaInsight({
    pageViews,
    yesterdayPageViews: 50,
    productViews,
    leads: 0,
    products: products.length,
  });

  setInsight(result.insight);

}, [pageViews, productViews, products]);


async function fetchPageViews() {

  const { data: { user } } = await supabase.auth.getUser();

  const { count, error } = await supabase
    .from("visitor_events")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", user.id)
    .eq("event_type", "PAGE_VIEW");

setPageViews(count || 0);

console.log("Page Views:", count);
  console.log(error);

}
async function fetchProductViews() {

  const { data: { user } } = await supabase.auth.getUser();

  const { count, error } = await supabase
    .from("visitor_events")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", user.id)
    .eq("event_type", "PRODUCT_VIEW");

  setProductViews(count || 0);

  console.log("Product Views:", count);
  console.log(error);

}

async function fetchProducts() {

  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) return;

  setProducts(data);

}


  function useSuggestion(prompt) {

    setInput(prompt);

  }

  function openFilePicker() {

    fileInputRef.current.click();

  }

  function handleFileChange(e) {

    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    setUploadPreview(URL.createObjectURL(file));

    setMessages(prev => [

      ...prev,

      {
        id: Date.now(),
        role: "user",
        image: URL.createObjectURL(file),
        text: `📎 ${file.name}`,
      }

    ]);

  }

  async function sendMessage() {

    if (!input.trim() && !selectedFile) return;

    const prompt = input;
    // If user wants to create a poster,
// show products instead of calling GPT.

if (
  prompt.toLowerCase().includes("poster")
) {

  setMessages((prev) => [

    ...prev,

    {
      id: Date.now(),
      role: "user",
      text: prompt,
    },

    {
      id: Date.now() + 1,
      role: "emma",
      text: "Which product would you like to promote today?",
    }

  ]);

  setShowProducts(true);

setInput("");

return;

}

    const thinkingId = Date.now();

    if (prompt.trim()) {

      setMessages(prev => [

        ...prev,

        {
          id: Date.now() + 1,
          role: "user",
          text: prompt,
        },

        {
          id: thinkingId,
          role: "emma",
          text: "🤖 Emma is thinking...",
        }

      ]);

    }

    setInput("");

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:3001/emma",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            prompt,
          }),

        }
      );

      const data = await response.json();

      setMessages(prev =>

        prev.map(msg =>

          msg.id === thinkingId

            ? {
                ...msg,
                text: data.reply,
              }

            : msg

        )

      );

    } catch (err) {

      console.error(err);

      setMessages(prev =>

        prev.map(msg =>

          msg.id === thinkingId

            ? {
                ...msg,
                text:
                  "❌ Emma couldn't connect. Please try again.",
              }

            : msg

        )

      );

    }

    setLoading(false);

  }

  async function promoteProduct(product) {

  setShowProducts(false);

  const prompt = `
Create a premium advertising poster.

Business Product:
${product.name}

Price:
₹${product.price}

Category:
${product.category}

Description:
${product.description}

Style:
Luxury
Modern
Professional
Eye-catching
Instagram Quality

`;

  setMessages(prev => [

    ...prev,

    {
      id: Date.now(),
      role: "user",
      text: `Promote ${product.name}`,
    },

    {
      id: Date.now() + 1,
      role: "emma",
      text: "🎨 Creating your premium poster...",
    }

  ]);

try {

  const response = await fetch(
    "http://localhost:3001/generate-poster",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    }
  );

  const data = await response.json();

  console.log(data);

} catch (err) {

  console.error(err);

}
}

    return (
    <div className="emma-page">

      {/* ================= HEADER ================= */}

      <header className="emma-header">

        <div className="header-left">

          <button
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            <FiArrowLeft />
            <span>Dashboard</span>
          </button>

        </div>

        <div className="online-status">
          <span></span>
          Online
        </div>

      </header>

      {/* ================= WORKSPACE ================= */}

      <main className="workspace">

        {/* ================= CONVERSATION ================= */}

        <div className="conversation">

          {messages.map((message) => (

            <div
              key={message.id}
              className={`message ${message.role}`}
            >

              {message.role === "emma" && (
                <div className="message-title">
                  🤖 Emma
                </div>
              )}

              {message.image && (

                <img
                  src={message.image}
                  alt="Uploaded"
                  className="chat-image"
                />

              )}

              {message.text &&
                message.text.split("\n").map((line, index) => (

                  <p key={index}>
                    {line}
                  </p>

                ))
              }

            </div>

          ))}

          <div className="chips">

            {suggestions.map((item, index) => (

              <button
                key={index}
                className="chip"
                onClick={() => useSuggestion(item.prompt)}
              >

                {item.icon}

                <span>

                  {item.label}

                </span>

              </button>

            ))}

          </div>





{showProducts && (
  <ProductSelector
  products={products}
  onSelect={promoteProduct}
/>
)}

          <div ref={bottomRef}></div>

        </div>

        {/* ================= IMAGE PREVIEW ================= */}

        {uploadPreview && (

          <div className="upload-preview">

            <img
              src={uploadPreview}
              alt="Preview"
            />

          </div>

        )}

        <EmmaInsightCard insight={insight} />

        {/* ================= COMPOSER ================= */}

        <div className="composer">

          <button
            className="attach-button"
            onClick={openFilePicker}
          >
            <FiPaperclip />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <input
            type="text"
            placeholder="Ask Emma anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                sendMessage();

              }

            }}
          />

          <button
            className="send-button"
            onClick={sendMessage}
            disabled={loading}
          >

            <FiSend className="fisend" />

          </button>

        </div>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="emma-footer">

        <span>

          Emma AI • LinkHub AI Marketing Assistant

        </span>

      </footer>

    </div>
  );

}

export default EmmaAI;