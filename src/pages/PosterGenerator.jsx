import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function PosterGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [generatedImage, setGeneratedImage] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const buildPrompt = (userPrompt) => {
    return `
Create a professional social media marketing poster.

Customer Request:
${userPrompt}

Requirements:
- Make it look like a premium advertisement.
- Use beautiful typography.
- Include product imagery if mentioned.
- Add promotional elements and discount badges if applicable.
- Suitable for WhatsApp Status and Instagram posts.
- High-quality commercial poster design.
- Use vibrant colors and modern poster styling.
- Keep all faces and products fully visible.
- Do not crop labels, captions, texts, people or products.
- Create a balanced poster layout.
- Leave space for text and offer badges.
- Design a realistic marketing poster for local businesses.
- Design such that everything is inside the poster.
- Nothing should be cut off.
- Add a safe margin around all text and images.
`;
  };

  const savePoster = async (
    base64Image,
    posterPrompt
  ) => {
    try {
      const response = await fetch(
        `data:image/png;base64,${base64Image}`
      );

      const blob =
        await response.blob();

      const fileName =
        Date.now() + ".png";

      const {
        error: uploadError,
      } = await supabase.storage
        .from("poster-images")
        .upload(fileName, blob, {
          contentType: "image/png",
        });

      if (uploadError)
        throw uploadError;

      const { data } =
        supabase.storage
          .from("poster-images")
          .getPublicUrl(fileName);

      const imageUrl =
        data.publicUrl;

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (user) {
        const {
          error: dbError,
        } = await supabase
          .from(
            "generated_posters"
          )
          .insert({
            user_id: user.id,
            prompt:
              posterPrompt,
            image_url: imageUrl,
          });

        if (dbError)
          throw dbError;
      }

      console.log(
        "Poster saved successfully"
      );
    } catch (err) {
      console.error(
        "Save poster error:",
        err
      );
    }
  };

  const generatePoster =
    async () => {
      if (!prompt) {
        alert(
          "Please enter a prompt."
        );
        return;
      }

      try {
        setLoading(true);
        setGeneratedImage("");

        const enhancedPrompt =
          buildPrompt(prompt);

        const response =
          await fetch(
            "http://localhost:3001/generate-poster",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                {
                  prompt:
                    enhancedPrompt,
                }
              ),
            }
          );

        const data =
          await response.json();

        if (data.error) {
          throw new Error(
            data.error
          );
        }

        if (
          data.data &&
          data.data[0]
        ) {
          const b64 =
            data.data[0]
              .b64_json;

          setGeneratedImage(
            `data:image/png;base64,${b64}`
          );

          await savePoster(
            b64,
            prompt
          );
        }
      } catch (err) {
        console.error(err);
        alert(
          "Failed to generate poster."
        );
      } finally {
        setLoading(false);
      }
    };

  const editPoster =
    async () => {
      if (!imageFile) {
        alert(
          "Please upload an image."
        );
        return;
      }

      if (!prompt) {
        alert(
          "Please enter a prompt."
        );
        return;
      }

      try {
        setLoading(true);
        setGeneratedImage("");

        const formData =
          new FormData();

        formData.append(
          "image",
          imageFile
        );

        formData.append(
          "prompt",
          buildPrompt(prompt)
        );

        const response =
          await fetch(
            "http://localhost:3001/edit-poster",
            {
              method: "POST",
              body: formData,
            }
          );

        const data =
          await response.json();

        if (data.error) {
          throw new Error(
            data.error
          );
        }

        if (
          data.data &&
          data.data[0]
        ) {
          const b64 =
            data.data[0]
              .b64_json;

          setGeneratedImage(
            `data:image/png;base64,${b64}`
          );

          await savePoster(
            b64,
            prompt
          );
        }
      } catch (err) {
        console.error(err);
        alert(
          "Failed to edit poster."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin:
          "40px auto",
        padding: "30px",
        background: "#fff",
        borderRadius:
          "20px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          textAlign:
            "center",
          marginBottom:
            "30px",
        }}
      >
        🎨 AI Poster Generator
      </h1>

      <button
        onClick={() =>
          navigate("/dashboard")
        }
        style={{
          marginBottom:
            "20px",
          padding:
            "10px 20px",
          border: "none",
          borderRadius:
            "10px",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <textarea
        rows="5"
        placeholder="Example: Create a 50% OFF Saree Sale Poster"
        value={prompt}
        onChange={(e) =>
          setPrompt(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "15px",
          borderRadius:
            "12px",
          border:
            "1px solid #ddd",
          marginBottom:
            "20px",
          fontSize: "16px",
        }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImageFile(
            e.target.files[0]
          )
        }
        style={{
          marginBottom:
            "20px",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom:
            "20px",
        }}
      >
        <button
          onClick={
            generatePoster
          }
        >
          🎨 Generate From Text
        </button>

        <button
          onClick={
            editPoster
          }
        >
          📸 Edit Uploaded Image
        </button>
      </div>

      {loading && (
        <h3>
          Generating
          poster...
        </h3>
      )}

      {generatedImage && (
        <div
          style={{
            marginTop:
              "30px",
          }}
        >
          <img
            src={
              generatedImage
            }
            alt="Generated Poster"
            style={{
              width: "100%",
              borderRadius:
                "15px",
            }}
          />

          <br />
          <br />

          <a
            href={
              generatedImage
            }
            download="poster.png"
          >
            <button>
              ⬇️ Download
              Poster
            </button>
          </a>

          {" "}

          <button
            onClick={() => {
              navigator.clipboard.writeText(
                prompt
              );
              alert(
                "Prompt copied!"
              );
            }}
          >
            📋 Copy Prompt
          </button>
        </div>
      )}
    </div>
  );
}

export default PosterGenerator;