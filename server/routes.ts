import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Profile image upload endpoint
  app.post("/api/upload-profile-image", async (req, res) => {
    try {
      const chunks: Buffer[] = [];
      
      req.on('data', (chunk) => {
        chunks.push(chunk);
      });

      req.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        const contentType = req.headers['content-type'] || '';
        
        // Get file extension from content type
        let extension = 'jpg';
        if (contentType.includes('png')) extension = 'png';
        else if (contentType.includes('jpeg')) extension = 'jpg';
        else if (contentType.includes('webp')) extension = 'webp';
        
        const filename = `profile-${Date.now()}.${extension}`;
        const filepath = join(process.cwd(), 'client', 'src', 'image', filename);
        
        await writeFile(filepath, buffer);
        
        res.json({ 
          success: true, 
          filename,
          path: `/src/image/${filename}`
        });
      });

      req.on('error', (error) => {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, error: 'Upload failed' });
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ success: false, error: 'Upload failed' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
