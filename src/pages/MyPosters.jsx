import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function MyPosters() {
  const [posters, setPosters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosters();
  }, []);

  const loadPosters = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("generated_posters")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
      return;
    }

    setPosters(data || []);
  };

  const deletePoster = async (poster) => {
    const confirmDelete = window.confirm(
      "Delete this poster?"
    );

    if (!confirmDelete) return;

    try {
      const fileName =
        poster.image_url.split("/").pop();

      await supabase.storage
        .from("poster-images")
        .remove([fileName]);

      await supabase
        .from("generated_posters")
        .delete()
        .eq("id", poster.id);

      setPosters((prev) =>
        prev.filter(
          (p) => p.id !== poster.id
        )
      );

      alert("Poster deleted.");
    } catch (err) {
      console.log(err);
      alert("Failed to delete poster.");
    }
  };

  const shareToWhatsApp = (url) => {
  window.open(
    `https://wa.me/?text=${encodeURIComponent(url)}`
  );
};

  return (
    <div style={{ padding: "30px" }}>
      <button
        onClick={() =>
          navigate("/dashboard")
        }
        style={{
          background: "#6c63ff",
          color: "#fff",
          padding: "12px 20px",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back to Dashboard
      </button>

      <h1>🎨 My Posters</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
              "repeat(auto-fit,minmax(350px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {posters.map((poster) => (
          <div
            key={poster.id}
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "15px",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={poster.image_url}
              alt={poster.prompt}
              style={{
                width: "100%",
                borderRadius: "10px",
              }}
            />

            <p>{poster.prompt}</p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <a
                href={poster.image_url}
                download
                target="_blank"
                rel="noreferrer"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                <button>
                  ⬇️ Download
                </button>
              </a>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deletePoster(poster);
                }}
              >
                🗑 Delete
              </button>

              <button
  onClick={() =>
    shareToWhatsApp(
      poster.image_url
    )
  }
>
 📲 Share Link
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPosters;