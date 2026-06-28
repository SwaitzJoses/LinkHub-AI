import { useState } from "react";
import "../styles/AnnouncementBroadcast.css";


function AnnouncementBroadcast({ leads = [], profile = {} }) {
  const [message, setMessage] = useState(`Hi {{name}} 

Special Offer from {{business_name}}!

Get {{offer}} off today.

Use coupon: {{coupon}}

Offer valid till {{date}}.

Reply to this message for more details.`);

  const [offer, setOffer] = useState("");
  const [coupon, setCoupon] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const buildMessage = (lead) => {
    return message
      .replace(/{{name}}/g, lead.name || "Customer")
      .replace(/{{phone}}/g, lead.phone || "")
      .replace(
        /{{business_name}}/g,
        profile?.business_name || "Our Business"
      )
      .replace(/{{offer}}/g, offer)
      .replace(/{{coupon}}/g, coupon)
      .replace(/{{date}}/g, expiryDate);
  };

  const sendAnnouncement = () => {
    if (!leads.length) {
      alert("No contacts found.");
      return;
    }

    leads.forEach((lead, index) => {
      setTimeout(() => {
        const msg = buildMessage(lead);

        const phone = String(lead.phone).replace(/\D/g, "");

        const url =
          `https://wa.me/91${phone}?text=` +
          encodeURIComponent(msg);

        window.open(url, "_blank");
      }, index * 1500);
    });
  };

  return (
    <div className="announcement-card">
      <h2>📢 Broadcast Announcement</h2>

      <input
        type="text"
        placeholder="Offer (50% OFF)"
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
      />

      <input
        type="text"
        placeholder="Coupon Code"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />

      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {image && (
        <p className="image-name">
          📸 {image.name}
        </p>
      )}

      <textarea
        rows="10"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="variables">
        <span>{"{{name}}"}</span>
        <span>{"{{phone}}"}</span>
        <span>{"{{business_name}}"}</span>
        <span>{"{{offer}}"}</span>
        <span>{"{{coupon}}"}</span>
        <span>{"{{date}}"}</span>
      </div>

      <button
        className="announcement-btn"
        onClick={sendAnnouncement}
      >
        🚀 Send Announcement
      </button>
    </div>
  );
}

export default AnnouncementBroadcast;