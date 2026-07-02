import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { analyzeBusiness } from "../utils/EmmaBrain";
import "../styles/EmmaCard.css";
import { useNavigate } from "react-router-dom";


function EmmaCard() {
    const navigate = useNavigate();
  const [brain, setBrain] = useState(null);
const [latestLead, setLatestLead] = useState(null);
const [waitingTime, setWaitingTime] = useState("");
const [showReplyPopup, setShowReplyPopup] = useState(false);
const [popupStep, setPopupStep] = useState("reply");

  useEffect(() => {
    loadEmma();
  }, []);

  async function loadEmma() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Load profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // Load products
    // Load products
const { data: products, error: productsError } = await supabase
  .from("products")
  .select("*")
  .eq("user_id", user.id);

if (productsError) {
  console.error("Products Error:", productsError);
}

console.log("Emma Products:", products);

    // Count profile views
    const { count: views } = await supabase
      .from("profile_views")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("profile_id", user.id);

    // Count link clicks
    const { count: clicks } = await supabase
      .from("link_clicks")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("profile_id", user.id);

    // Count WhatsApp leads
  const { count: leads } = await supabase
  .from("whatsapp_leads")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("profile_id", user.id)
  .eq("status", "pending");

 const { data: latestLeadData } = await supabase
  .from("whatsapp_leads")
  .select("*")
  .eq("profile_id", user.id)
  .eq("status", "pending")
  .order("created_at", { ascending: true })
  .limit(1);

if (latestLeadData && latestLeadData.length > 0) {
  const lead = latestLeadData[0];

  setLatestLead(lead);

  const created = new Date(lead.created_at);
  const now = new Date();

  const diffMinutes = Math.floor((now - created) / 60000);

  if (diffMinutes < 60) {
    setWaitingTime(`${diffMinutes} minute(s)`);
  } else if (diffMinutes < 1440) {
    setWaitingTime(`${Math.floor(diffMinutes / 60)} hour(s)`);
  } else {
    setWaitingTime(`${Math.floor(diffMinutes / 1440)} day(s)`);
  }
}

    // Count posters
   const { count: posters } = await supabase
  .from("generated_posters")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("user_id", user.id);

    const result = analyzeBusiness({
      logo_url: profile?.logo_url,
      business_name: profile?.business_name,
      bio: profile?.bio,
      website: profile?.website,
      phone: profile?.whatsapp,
      instagram: profile?.instagram,
      facebook: profile?.facebook,
      address: profile?.address,
      products: products || [],
      views: views || 0,
      clicks: clicks || 0,
      leads: leads || 0,
      posters: posters || 0,
    });

    setBrain(result);
  }

  if (!brain) {
    return (
      <div className="emma-card">
        <h2>🌸 Emma</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="emma-card">
      <div className="emma-header">
        <h2>🌸 Emma</h2>
        <span className="emma-mood">{brain.mood}</span>
      </div>

      <h3>{brain.greeting}</h3>

      {brain.celebration && (
        <div className="emma-success">
          {brain.celebration}
        </div>
      )}

      {brain.warning && (
        <div className="emma-warning">
          {brain.warning}
        </div>
      )}

      {brain.compliment && (
        <div className="emma-compliment">
          {brain.compliment}
        </div>
      )}

      <div className="mission-box">
        <div className="emma-tasks">

    <h3>📋 Today's Tasks</h3>

    {brain.tasks.map((task,index)=>(

        <div
            key={index}
            className="emma-task"
        >

            <span>

                {task.icon}

            </span>

            <span>

                {task.title}

            </span>

        </div>

    ))}

</div>
      <h3>🌸 Today's Priority</h3>

      {brain.mission.title === "Reply to your customers" ? (
  <h2>👤 {latestLead?.name}</h2>
) : (
  <h2>
    {brain.mission.icon} {brain.mission.title}
  </h2>
)}

        {brain.mission.title === "Reply to your customers" && latestLead ? (
<div className="priority-customer">

  <p>
    <strong>📱 Customer Phone</strong>
  </p>

  <h3>{latestLead.phone}</h3>
<p>
  ⏰ Waiting for <strong>{waitingTime}</strong>
</p>

  {brain.stats.leads > 1 && (
    <p>
      <strong>
        + {brain.stats.leads - 1} more enquiries waiting
      </strong>
    </p>
  )}

</div>
) : (
  <p>{brain.mission.reason}</p>
)}

  <button
  className="emma-btn"
  onClick={() => {

    // If today's mission is replying to customers
    if (
      brain.mission.title === "Reply to your customers" &&
      latestLead
    ) {
      const phone = latestLead.phone.replace(/\D/g, "");

      window.open(
        `https://wa.me/${phone}`,
        "_blank"
      );

      setShowReplyPopup(true);

      return;
    }

    // Scroll to dashboard sections
    if (brain.mission.action.startsWith("#")) {
      const section = brain.mission.action.substring(1);

      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    // Navigate to another page
    navigate(brain.mission.action);

  }}
>
  {brain.mission.title === "Reply to your customers"
    ? "💬 Reply on WhatsApp"
    : "🚀 Start Mission"}
</button>
      </div>

      <div className="emma-tip">
        <div className="emma-progress">

  <h3>📈 Today's Progress</h3>

  <div className="progress-bar">

    <div
      className="progress-fill"
      style={{ width: `${brain.progress}%` }}
    ></div>

  </div>

  <p>
    {brain.completed} / {brain.total} Tasks Completed
  </p>

</div>
        💡 {brain.motivation}
        {showReplyPopup && (
  <div className="emma-popup-overlay">

    <div className="emma-popup">

      <h2>🌸 Emma</h2>

     {popupStep === "reply" ? (
    <>
        <p>
            Did you reply to <strong>{latestLead?.name}</strong>?
        </p>
    </>
) : (
    <>
        <h3>🎉 Great Job!</h3>

        <p>
            You replied to your customer.
        </p>

        <p>
            Emma recommends creating today's poster next.
        </p>
    </>
)}

      <div className="emma-popup-buttons">

       <button
  className="emma-btn"
onClick={async () => {

    if (popupStep === "reply") {

        // Mark this lead as replied
      if (latestLead) {

  console.log("Updating lead:", latestLead);

  const { data, error } = await supabase
    .from("whatsapp_leads")
    .update({
      status: "replied",
    })
    .eq("id", latestLead.id)
    .select();

  console.log("Updated Rows:", data);
  console.log("Update Error:", error);

}

        // Reload Emma's data
        await loadEmma();

        // Move to the next popup step
        setPopupStep("poster");
        return;
    }

    navigate("/poster-generator", {
        state: {
            source: "emma",
        },
    });

    setShowReplyPopup(false);

}}
>
  {popupStep === "reply"
    ? "✅ Yes"
    : "🎨 Create Poster"}
</button>

        <button
          className="emma-btn secondary"
          onClick={() => setShowReplyPopup(false)}
        >
          ⏰ Later
        </button>

      </div>

    </div>

  </div>
)}
      </div>
    </div>
  );
}

export default EmmaCard;