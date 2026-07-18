import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { toFile } from "openai/uploads";
import multer from "multer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


import Emma from "./src/emma-core/Emma.js";

const emma = new Emma({
    id: "emma-server"
});



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ======================
// Multer Memory Storage
// ======================

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
  },
});

// ======================
// Test Route
// ======================

app.get("/", (req, res) => {
  res.send("🚀 LinkHub AI Server Running");
});

// ======================
// Generate Poster
// ======================

app.post("/generate-poster", async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log("Generating poster...");

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1536",
    });

    res.json(result);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// Edit Poster
// ======================

app.post(
  "/edit-poster",
  upload.single("image"),
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({
          error: "No image uploaded",
        });
      }

      const prompt = req.body.prompt;

      console.log("Editing image...");
      console.log(req.file.originalname);

      const image = await toFile(
        req.file.buffer,
        req.file.originalname,
        {
          type: req.file.mimetype,
        }
      );

      const result = await openai.images.edit({
        model: "gpt-image-1",
        image,
        prompt,
        size: "1024x1024",
      });

      res.json(result);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        error: err.message,
      });

    }
  }
);






// ======================
// Start Server
// ======================


app.post("/emma/experience", async (req, res) => {

  try {

    const result = await emma.experience(req.body);

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }

});



app.post("/emma", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.responses.create({
      model: "gpt-5",
      input: `
You are Emma, the AI Marketing Assistant inside LinkHub.

Help business owners with:
- Marketing ideas
- Posters
- Instagram captions
- WhatsApp campaigns
- Sales advice
- Festival offers

User:
${prompt}
      `,
    });

    res.json({
      reply: response.output_text,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      reply: "Sorry, something went wrong."
    });
  }
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});