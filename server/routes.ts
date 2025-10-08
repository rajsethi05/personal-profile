import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Serve uploaded images
  const uploadsPath = join(process.cwd(), 'uploads');
  await mkdir(uploadsPath, { recursive: true });
  app.use('/uploads', express.static(uploadsPath));

  // Profile image upload endpoint - use raw body parser for this route
  app.post("/api/upload-profile-image", express.raw({ 
    type: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
    limit: '5mb' 
  }), async (req, res) => {
    try {
      if (!req.body || !Buffer.isBuffer(req.body)) {
        return res.status(400).json({ 
          success: false, 
          error: 'No image data received' 
        });
      }

      const contentType = req.headers['content-type'] || '';
      
      // Get file extension from content type
      let extension = 'jpg';
      if (contentType.includes('png')) extension = 'png';
      else if (contentType.includes('jpeg') || contentType.includes('jpg')) extension = 'jpg';
      else if (contentType.includes('webp')) extension = 'webp';
      
      const filename = `profile-${Date.now()}.${extension}`;
      const filepath = join(uploadsPath, filename);
      
      await writeFile(filepath, req.body);
      
      return res.json({ 
        success: true, 
        filename,
        path: `/uploads/${filename}`
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Upload failed' 
      });
    }
  });

  // Contact form endpoint
  app.post("/api/send-contact-email", async (req, res) => {
    try {
      const { toEmail, fromEmail, message } = req.body;

      if (!toEmail || !fromEmail || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'To email, from email, and message are required' 
        });
      }

      // Log the message for now
      console.log('Contact form submission:');
      console.log(`From: ${fromEmail}`);
      console.log(`To: ${toEmail}`);
      console.log(`Message: ${message}`);

      // TODO: Set up email service (Resend/SendGrid) to actually send emails
      // For now, just return success
      
      return res.json({ 
        success: true,
        message: 'Message received (currently logged only - set up email service to send emails)'
      });
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send message' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
