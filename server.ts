import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, GenerateVideosOperation } from "@google/genai";
import fs from "fs";
import { Readable } from "stream";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser for JSON with large payload (for base64 images)
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  let aiClient: GoogleGenAI | null = null;
  function getAI(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Serve the public verta.jpg as base64 for frontend video generation
  app.get("/api/cover-image-base64", (req, res) => {
    try {
      const imgPath = path.join(process.cwd(), "public", "verta.jpg");
      if (fs.existsSync(imgPath)) {
        const fileData = fs.readFileSync(imgPath);
        const base64 = fileData.toString("base64");
        res.json({ success: true, mimeType: "image/jpeg", data: base64 });
      } else {
        res.status(404).json({ error: "verta.jpg not found" });
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // 1. Generate Video with Veo
  app.post("/api/generate-video", async (req, res) => {
    try {
      const { prompt, image, aspectRatio } = req.body;
      const ai = getAI();

      let imagePayload: any = undefined;
      if (image && image.data) {
        imagePayload = {
          imageBytes: image.data,
          mimeType: image.mimeType || "image/jpeg",
        };
      } else {
        // Fallback to reading public/verta.jpg
        const imgPath = path.join(process.cwd(), "public", "verta.jpg");
        if (fs.existsSync(imgPath)) {
          const fileData = fs.readFileSync(imgPath);
          imagePayload = {
            imageBytes: fileData.toString("base64"),
            mimeType: "image/jpeg",
          };
        }
      }

      const operation = await ai.models.generateVideos({
        model: "veo-3.1-fast-generate-preview",
        prompt: prompt || "Cinematic animation of this logo with glowing illuminated light nodes, vibrant pulsing network connections, high-tech corporate lighting and particle effects",
        image: imagePayload,
        config: {
          numberOfVideos: 1,
          resolution: "720p",
          aspectRatio: (aspectRatio === "9:16" ? "9:16" : "16:9") as any,
        },
      });

      res.json({ operationName: operation.name });
    } catch (err: any) {
      console.error("Error generating video:", err);
      res.status(500).json({ error: err.message || "Failed to initiate video generation" });
    }
  });

  // 2. Poll Video Status
  app.post("/api/video-status", async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: "operationName is required" });
      }
      const ai = getAI();
      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      res.json({ 
        done: Boolean(updated.done), 
        error: updated.error || null,
        hasVideo: Boolean(updated.response?.generatedVideos?.[0]?.video?.uri)
      });
    } catch (err: any) {
      console.error("Error checking video status:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // 3. Download Video
  app.post("/api/video-download", async (req, res) => {
    try {
      const { operationName } = req.body;
      if (!operationName) {
        return res.status(400).json({ error: "operationName is required" });
      }
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
      }

      const ai = getAI();
      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });

      const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
      if (!uri) {
        return res.status(404).json({ error: "Video URI not found in operation response" });
      }

      const videoRes = await fetch(uri, {
        headers: { "x-goog-api-key": apiKey },
      });

      if (!videoRes.ok) {
        return res.status(videoRes.status).json({ error: `Upstream error: ${videoRes.statusText}` });
      }

      res.setHeader("Content-Type", "video/mp4");
      res.setHeader("Content-Disposition", 'inline; filename="verta-cover-animation.mp4"');

      if (!videoRes.body) {
        return res.status(500).json({ error: "No video response body" });
      }

      const nodeStream = Readable.fromWeb(videoRes.body as any);
      nodeStream.pipe(res);
    } catch (err: any) {
      console.error("Error downloading video:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
