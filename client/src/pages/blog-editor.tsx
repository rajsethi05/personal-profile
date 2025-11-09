import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TurndownService from "turndown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Download, Eye, Edit } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [content, setContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
    "code-block",
  ];

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const handleDownload = () => {
    // Convert HTML content to Markdown
    const markdown = turndownService.turndown(content);

    const blogData = {
      title,
      category,
      technologies,
      image: imagePath,
      project_url: "", // Will be filled manually
      description,
      github_url: githubUrl,
      content: markdown,
    };

    const jsonString = JSON.stringify(blogData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, "_")}_blog.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getMarkdownPreview = () => {
    return turndownService.turndown(content);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Blog Editor</h1>
            <p className="text-muted-foreground">
              Create and format your blog post, then download as JSON
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              data-testid="button-toggle-preview"
            >
              {previewMode ? (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Mode
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </>
              )}
            </Button>
            <Button
              onClick={handleDownload}
              disabled={!title || !content}
              data-testid="button-download"
            >
              <Download className="mr-2 h-4 w-4" />
              Download JSON
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Metadata Section */}
          <Card>
            <CardHeader>
              <CardTitle>Blog Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    data-testid="input-title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., AI Testing, Automation"
                    data-testid="input-category"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the blog"
                  data-testid="input-description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL (optional)</Label>
                  <Input
                    id="github"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    data-testid="input-github"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image Path</Label>
                  <Input
                    id="image"
                    value={imagePath}
                    onChange={(e) => setImagePath(e.target.value)}
                    placeholder="uploads/qa_blogs/image.png"
                    data-testid="input-image"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tech">Technologies</Label>
                <div className="flex gap-2">
                  <Input
                    id="tech"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                    placeholder="Add technology and press Enter"
                    data-testid="input-technology"
                  />
                  <Button onClick={addTechnology} variant="outline" data-testid="button-add-tech">
                    Add
                  </Button>
                </div>
                {technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 cursor-pointer"
                        data-testid={`badge-tech-${index}`}
                      >
                        {tech}
                        <X
                          className="ml-2 h-3 w-3"
                          onClick={() => removeTechnology(tech)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Blog Content *</CardTitle>
            </CardHeader>
            <CardContent>
              {previewMode ? (
                <div className="min-h-[700px] p-4 border border-border rounded-lg">
                  <article className="prose prose-lg dark:prose-invert max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {getMarkdownPreview()}
                    </ReactMarkdown>
                  </article>
                </div>
              ) : (
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  className="h-[700px] mb-12"
                  placeholder="Start writing your blog post..."
                />
              )}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <ol className="list-decimal list-inside space-y-1">
                <li>Manually save the JSON file to: <code className="text-primary bg-background px-1 rounded">client/public/uploads/qa_blogs/</code> or <code className="text-primary bg-background px-1 rounded">ai_blogs/</code></li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
