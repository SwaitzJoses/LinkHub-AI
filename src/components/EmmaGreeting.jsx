import "../styles/EmmaGreeting.css";

function EmmaGreeting() {
  const hour = new Date().getHours();

  let greeting = "";

  if (hour >= 5 && hour < 12) greeting = "🌅 Good Morning";
  else if (hour >= 12 && hour < 17) greeting = "☀️ Good Afternoon";
  else if (hour >= 17 && hour < 21) greeting = "🌇 Good Evening";
  else greeting = "🌙 Good Night";

  const tips = [
    "Run a limited-time offer today.",
    "Share your LinkHub on WhatsApp Status.",
    "Highlight your best-selling product.",
    "Reply quickly to customer enquiries.",
    "Upload one new product today."
  ];

  const tip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="emma-hero">

      <div className="emma-top">

        <div>
          <span className="emma-badge">🤖 Emma AI</span>

          <h1>{greeting}, Swaitz 👋</h1>

          <p>
            Ready to grow your business today?
          </p>
        </div>

        <div className="emma-status">
          <span className="dot"></span>
          Online
        </div>

      </div>

      <div className="emma-tip-card">

        <h3>💡 Today's Tip</h3>

        <p>{tip}</p>

      </div>

      <div className="emma-actions">

        <button>🎨 Poster</button>

        <button>📝 Caption</button>

        <button>💬 WhatsApp</button>

        <button>💡 Ideas</button>

      </div>

    </div>
  );
}

export default EmmaGreeting;