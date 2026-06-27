import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import WhatsAppLeadForm from "../components/WhatsAppLeadForm";



function PublicProfile() {
  const { username } = useParams();
console.log("URL username:", username);
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .maybeSingle();;

    if (error) {
      console.log(error);
      return;
    }

    setProfile(data);

    if (data) {
      // Record profile view
      let visitorId = localStorage.getItem("visitor_id");

if (!visitorId) {
  visitorId = crypto.randomUUID();
  localStorage.setItem("visitor_id", visitorId);
}

await supabase.from("profile_views").insert({
  profile_id: profile.id,
  visitor_id: visitorId,
});
      // Load custom links
      const { data: linksData, error: linksError } =
        await supabase
          .from("links")
          .select("*")
          .eq("profile_id", data.id)
          .order("created_at");

      console.log("linksData:", linksData);
      console.log("linksError:", linksError);

      setLinks(linksData || []);
    }
  };

  if (!profile) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>User not found</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      {profile.logo_url && (
        <img
          src={profile.logo_url}
          alt="Logo"
          width="150"
          style={{
            borderRadius: "20px",
            marginBottom: "20px",
          }}
        />
      )}

      <h1>{profile.business_name}</h1>

      <p>{profile.bio}</p>

      {profile.website && (
        <p>
          🌐{" "}
          <a
            href={profile.website}
            target="_blank"
            rel="noreferrer"
            onClick={async () => {
              await supabase.from("link_clicks").insert({
                profile_id: profile.id,
                link_title: "Website",
              });
            }}
          >
            {profile.website}
          </a>
        </p>
      )}


      {profile.whatsapp && (
        <p>
          📱{" "}
          <a
            href={`https://wa.me/${profile.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            onClick={async () => {
              await supabase.from("link_clicks").insert({
                profile_id: profile.id,
                link_title: "WhatsApp",
              });
            }}
          >
            {profile.whatsapp}
          </a>
        </p>
      )}

      {profile.instagram && (
        <p>
          📷{" "}
          <a
            href={`https://instagram.com/${profile.instagram}`}
            target="_blank"
            rel="noreferrer"
            onClick={async () => {
              await supabase.from("link_clicks").insert({
                profile_id: profile.id,
                link_title: "Instagram",
              });
            }}
          >
            @{profile.instagram}
          </a>
        </p>
      )}

      <br />
<WhatsAppLeadForm 
 profileId={profile.id}
  whatsapp={profile.whatsapp}/>
      {links.map((link) => (
        <button
          key={link.id}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "10px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={async () => {
            await supabase.from("link_clicks").insert({
              profile_id: profile.id,
              link_title: link.title,
            });

            window.open(link.url, "_blank");
          }}
        >
          {link.title}
        </button>
      ))}
    </div>
  );
}

export default PublicProfile;