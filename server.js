import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { toFile } from "openai/uploads";
import multer from "multer";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create uploads folder if it doesn't exist
const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ======================
// Multer Storage
// ======================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, uploadDir);
},
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      allowed.includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Unsupported file type: ${file.mimetype}`
        )
      );
    }
  },
});

// ======================
// Test Route
// ======================
app.get("/", (req, res) => {
  res.send(
    "🚀 LinkHub AI Server Running"
  );
});

// ======================
// Generate Poster
// ======================
app.post(
  "/generate-poster",
  async (req, res) => {
    try {
      const { prompt } = req.body;

      console.log("Generating:");
      console.log(prompt);

      const result =
        await openai.images.generate({
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
  }
);

// ======================
// Edit Poster
// ======================
app.post(
  "/edit-poster",
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Uploaded File:");
      console.log(req.file);

      if (!req.file) {
        return res.status(400).json({
          error: "No image uploaded.",
        });
      }

      console.log(
        "Mimetype:",
        req.file.mimetype
      );

      const prompt =
        req.body.prompt;

      const image =
        await toFile(
          fs.createReadStream(
            req.file.path
          ),
          req.file.originalname,
          {
            type:
              req.file.mimetype,
          }
        );

      const result =
        await openai.images.edit({
          model: "gpt-image-1",
          image,
          prompt,
          size: "1024x1024",
        });

      if (
        fs.existsSync(
          req.file.path
        )
      ) {
        fs.unlinkSync(
          req.file.path
        );
      }

      res.json(result);
    } catch (err) {
      console.error(err);

      if (
        req.file &&
        fs.existsSync(
          req.file.path
        )
      ) {
        fs.unlinkSync(
          req.file.path
        );
      }

      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// ======================
// Start Server
// ======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});