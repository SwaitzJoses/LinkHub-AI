import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setProfile(data);
  };

  if (!profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>{profile.business_name}</h1>

      <p>{profile.bio}</p>

      <hr />

      {profile.website && (
        <p>
          🌐 Website: {profile.website}
        </p>
      )}

      {profile.whatsapp && (
        <p>
          📱 WhatsApp: {profile.whatsapp}
        </p>
      )}

      {profile.instagram && (
        <p>
          📷 Instagram: {profile.instagram}
        </p>
      )}
    </div>
  );
}

export default Profile;