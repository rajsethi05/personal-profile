import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { writeFile, mkdir, readFile } from "fs/promises";
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

  // Blog save endpoint
  app.post("/api/save-blog", async (req, res) => {
    try {
      const { blogData, isDraft, fileName } = req.body;

      if (!blogData || !blogData.title) {
        return res.status(400).json({ 
          success: false, 
          error: 'Blog data and title are required' 
        });
      }

      const timestamp = Date.now();
      const folder = isDraft ? 'draft' : 'blogs';
      const name = isDraft ? `draft-${timestamp}` : (fileName || `blog-${timestamp}`);
      const filepath = join(process.cwd(), 'client', 'src', 'data', folder, `${name}.json`);
      
      // Create folder if it doesn't exist
      await mkdir(join(process.cwd(), 'client', 'src', 'data', folder), { recursive: true });
      
      // Write blog data to file
      await writeFile(filepath, JSON.stringify(blogData, null, 2), 'utf-8');
      
      return res.json({ 
        success: true,
        fileName: `${name}.json`,
        message: isDraft ? 'Draft saved successfully' : 'Blog published successfully'
      });
    } catch (error) {
      console.error('Save blog error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to save blog' 
      });
    }
  });

  // Blog read endpoint
  app.get("/api/blog/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      
      // Remove .json extension if provided
      const cleanFilename = filename.endsWith('.json') ? filename : `${filename}.json`;
      const filepath = join(process.cwd(), 'client', 'src', 'data', 'blogs', cleanFilename);
      
      // Read the blog file
      const fileContent = await readFile(filepath, 'utf-8');
      const blogData = JSON.parse(fileContent);
      
      return res.json(blogData);
    } catch (error) {
      console.error('Read blog error:', error);
      return res.status(404).json({ 
        success: false, 
        error: 'Blog post not found' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
