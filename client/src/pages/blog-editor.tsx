import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FileText, Save, Upload } from "lucide-react";

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [projectSummary, setProjectSummary] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [content, setContent] = useState('');
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const response = await fetch('/api/upload-profile-image', {
        method: 'POST',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      const data = await response.json();

      if (data.success) {
        setCoverImage(data.path);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    setIsPublishDialogOpen(true);
  };

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    setIsSaving(true);
    const blogData = {
      title,
      category,
      technologies,
      coverImage,
      description: content,
    };

    try {
      const response = await fetch('/api/save-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blogData,
          isDraft: true,
          projectSummary,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Draft saved successfully!');
      } else {
        alert('Failed to save draft. Please try again.');
      }
    } catch (error) {
      console.error('Save draft error:', error);
      alert('Failed to save draft. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmPublish = async () => {
    if (!fileName.trim()) {
      alert('Please enter a file name');
      return;
    }

    setIsSaving(true);
    
    // Convert technologies string to array for compatibility
    const techArray = technologies.split(',').map(t => t.trim()).filter(t => t);
    
    const blogData = {
      title,
      category,
      technologies,
      coverImage,
      description: content,
    };

    const projectData = {
      title,
      category,
      technologies: techArray,
      image: coverImage,
      description: projectSummary,
      project_url: `/project/details/${fileName}`,
      githubUrl,
    };

    try {
      const response = await fetch('/api/save-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blogData,
          projectData,
          isDraft: false,
          fileName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Blog published successfully!');
        setIsPublishDialogOpen(false);
        setFileName('');
        // Reset form
        setTitle('');
        setCategory('');
        setTechnologies('');
        setCoverImage('');
        setProjectSummary('');
        setGithubUrl('');
        setContent('');
      } else {
        alert('Failed to publish blog. Please try again.');
      }
    } catch (error) {
      console.error('Publish error:', error);
      alert('Failed to publish blog. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Blog Editor</h1>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full"
              data-testid="input-blog-title"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category
            </label>
            <Input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Testing, Automation, QA"
              className="w-full"
              data-testid="input-blog-category"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Technologies
            </label>
            <Input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="e.g., Selenium, Cypress, Jest"
              className="w-full"
              data-testid="input-blog-technologies"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Cover Image
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="cover-image-input"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                data-testid="input-cover-image-file"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('cover-image-input')?.click()}
                disabled={isUploading}
                data-testid="button-upload-cover"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </Button>
              {coverImage && (
                <div className="flex items-center gap-2">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="h-16 w-16 object-cover rounded border"
                    data-testid="img-cover-preview"
                  />
                  <span className="text-sm text-muted-foreground">Image uploaded</span>
                </div>
              )}
            </div>
          </div>

          {/* Project Summary */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project Summary
            </label>
            <textarea
              value={projectSummary}
              onChange={(e) => setProjectSummary(e.target.value)}
              placeholder="Brief summary for the projects page..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              data-testid="textarea-project-summary"
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              GitHub URL
            </label>
            <Input
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="w-full"
              data-testid="input-github-url"
            />
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Content
            </label>
            <div className="bg-white dark:bg-gray-800 rounded-lg" data-testid="editor-blog-content">
              <style>{`
                .ql-snow .ql-editor pre.ql-syntax {
                  background-color: #f1f5f9;
                  color: #1e293b;
                  border-radius: 0.375rem;
                  padding: 1rem;
                }
                .ql-snow .ql-editor code {
                  background-color: #f1f5f9;
                  color: #1e293b;
                  padding: 0.125rem 0.375rem;
                  border-radius: 0.25rem;
                }
              `}</style>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Write your blog content here..."
                className="h-96"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-16">
            <Button
              onClick={handleSaveDraft}
              disabled={isSaving}
              variant="outline"
              className="flex-1"
              data-testid="button-save-draft"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isSaving}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-publish"
            >
              <FileText className="mr-2 h-4 w-4" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      {/* Publish Dialog */}
      <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Publish Blog
            </DialogTitle>
            <DialogDescription>
              Enter a name for the JSON file (without extension)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                File Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="e.g., my-first-blog"
                className="w-full"
                data-testid="input-file-name"
              />
              <p className="text-sm text-muted-foreground mt-1">
                The file will be saved as: {fileName || 'filename'}.json
              </p>
            </div>

            <Button
              onClick={confirmPublish}
              disabled={isSaving || !fileName.trim()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-confirm-publish"
            >
              {isSaving ? 'Publishing...' : 'Confirm & Publish'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
