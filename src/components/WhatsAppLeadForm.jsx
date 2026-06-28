import { useState } from "react";
import { supabase } from "../lib/supabase";

function WhatsAppLeadForm({ profileId, whatsapp }) {
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
const handleWhatsApp = async () => {
  if (!leadName || !leadPhone) {
    alert("Please fill all fields");
    return;
  }

const { error } = await supabase
  .from("whatsapp_leads")
  .insert({
    profile_id: profileId,
    name: leadName,
    phone: leadPhone,
  });

if (error) {
  console.log(error);
  alert("Something went wrong.");
  return;
}

  const message =
    `Hi, my name is ${leadName}. ` +
    `My phone number is ${leadPhone}. ` +
    `I would like more information.`;

  window.open(
    `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};
  return (
    <div className="card">
    

      <input
        type="text"
        placeholder="Your Name"
        value={leadName}
        onChange={(e) => setLeadName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Phone Number"
        value={leadPhone}
        onChange={(e) => setLeadPhone(e.target.value)}
      />

      <br /><br />

     <button onClick={handleWhatsApp}>
  WhatsApp Me
</button>
    </div>
  );
}

export default WhatsAppLeadForm;