import { useState } from "react";
import "../styles/AIPoster.css";

function AIPoster() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleGenerate = async () => {
    console.log("BUTTON CLICKED");

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    try {
      setLoading(true);
      setGeneratedImage("");

      console.log(
        "Calling backend..."
      );

      const formData =
        new FormData();

      formData.append(
        "image",
        image
      );

      formData.append(
        "prompt",
        prompt
      );

      const response =
        await fetch(
          "http://localhost:3001/edit-poster",
          {
            method: "POST",
            body: formData,
          }
        );

      console.log(
        "Response status:",
        response.status
      );

      const posterData =
        await response.json();

      console.log(
        "OpenAI Response:",
        posterData
      );

      if (posterData.error) {
        throw new Error(
          posterData.error
        );
      }

      const base64Image =
        posterData.data[0].b64_json;

      setGeneratedImage(
        `data:image/png;base64,${base64Image}`
      );

      alert(
        "Poster generated!"
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="poster-page">
      <div className="poster-card">
        <h1 className="poster-title">
          ✨ AI Poster Generator
        </h1>

        <p className="poster-subtitle">
          Upload an image and
          describe the poster you
          want.
        </p>

        <input
          className="upload-input"
          type="file"
          accept="image/*"
          onChange={
            handleImageUpload
          }
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="image-preview"
          />
        )}

        <textarea
          className="prompt-box"
          placeholder={`Examples:

Create a 50% OFF Saree Sale poster for my boutique.

Create a poster for fresh sugarcane juice for ₹20.

Create a grand opening poster for my new clothing store.

Create a weekend special offer poster for my restaurant.

Create a festival discount poster for my jewellery shop.

Create a Buy 1 Get 1 Free poster for my bakery.

Create a new arrivals poster for my fashion store.

Create a special offer poster for my mobile shop.

Create a summer sale poster for my supermarket.

Create a poster for free home delivery for my business.`}
          value={prompt}
          onChange={(e) =>
            setPrompt(
              e.target.value
            )
          }
        />

        <button
          className="generate-btn"
          onClick={
            handleGenerate
          }
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "✨ Generate Poster"}
        </button>

        {generatedImage && (
          <div
            style={{
              marginTop:
                "30px",
            }}
          >
            <h3>
              Generated Poster
            </h3>

            <img
              src={
                generatedImage
              }
              alt="Generated Poster"
              style={{
                width: "100%",
                borderRadius:
                  "15px",
                marginTop:
                  "10px",
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
              <button
                className="generate-btn"
              >
                Download Poster
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIPoster;