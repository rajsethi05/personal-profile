import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Project {
  title: string;
  category: string;
  technologies: string[];
  image?: string;
  project_url?: string;
  description: string;
  github_url?: string;
  status?: string;
}

export default function ProjectDetails() {
  const [, params] = useRoute("/project-details/:id");
  const [project, setProject] = useState<Project | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"markdown" | "pdf" | "json" | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProjectDetails = async () => {
      if (!params?.id) return;

      try {
        setLoading(true);
        const profileId = import.meta.env.VITE_PROFILE_ID || "qa";
        
        const projectFile =
          profileId === "qa"
            ? "/uploads/qa_projects.json"
            : profileId === "ai"
              ? "/uploads/ai_projects.json"
              : "/uploads/qa_projects.json";

        const response = await fetch(projectFile);
        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        const projects: Project[] = await response.json();
        const projectIndex = parseInt(params.id);
        const selectedProject = projects[projectIndex];

        if (!selectedProject) {
          throw new Error("Project not found");
        }

        setProject(selectedProject);

        if (selectedProject.project_url) {
          const filePath = selectedProject.project_url.startsWith("/")
            ? selectedProject.project_url
            : `/${selectedProject.project_url}`;
          
          const isPdf = filePath.toLowerCase().endsWith('.pdf');
          const isJson = filePath.toLowerCase().endsWith('.json');
          
          if (isPdf) {
            setFileType("pdf");
            setPdfUrl(filePath);
          } else if (isJson) {
            setFileType("json");
            const jsonResponse = await fetch(filePath);
            if (jsonResponse.ok) {
              const jsonData = await jsonResponse.json();
              setMarkdownContent(jsonData.content || "");
            }
          } else {
            setFileType("markdown");
            const mdResponse = await fetch(filePath);
            if (mdResponse.ok) {
              const mdText = await mdResponse.text();
              setMarkdownContent(mdText);
            }
          }
        }
      } catch (err) {
        console.error("Error loading project:", err);
        setError(err instanceof Error ? err.message : "Project not found");
      } finally {
        setLoading(false);
      }
    };

    loadProjectDetails();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-muted rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            {error || "The requested project does not exist."}
          </p>
          <Link href="/projects">
            <Button data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/projects">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>

        {/* Project Header */}
        <article className="bg-card rounded-lg shadow-lg overflow-hidden">
          {/* Cover Image */}
          {project.image && (
            <div className="w-full h-64 sm:h-96 overflow-hidden">
              <img
                src={project.image.startsWith("/") ? project.image : `/${project.image}`}
                alt={project.title}
                className="w-full h-full object-cover"
                data-testid="img-project-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-8 lg:p-12">
            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              data-testid="text-project-title"
            >
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-project-description">
              {project.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.category && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Category:
                  </span>
                  <span
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    data-testid="text-project-category"
                  >
                    {project.category}
                  </span>
                </div>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-muted-foreground">
                    Technologies:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                        data-testid={`text-project-tech-${index}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Project Content */}
            {fileType === "pdf" && pdfUrl ? (
              <div className="my-8">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-[800px] border-0 rounded-lg"
                  title="PDF Viewer"
                  data-testid="content-pdf"
                />
              </div>
            ) : (fileType === "markdown" || fileType === "json") && markdownContent ? (
              <div
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:text-foreground 
                  prose-p:text-muted-foreground
                  prose-a:text-primary
                  prose-strong:text-foreground
                  prose-code:text-foreground
                  prose-pre:bg-muted
                  prose-blockquote:border-primary
                  prose-img:rounded-lg"
                data-testid="content-markdown"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    img: ({src, alt, ...props}) => {
                      if (!src) return null;
                      return (
                        <img 
                          src={src} 
                          alt={alt || ""} 
                          className="rounded-lg shadow-lg max-w-full h-auto my-4" 
                          loading="lazy"
                          style={{ display: 'block', margin: '1.5rem auto' }}
                        />
                      );
                    }
                  }}
                  urlTransform={(url) => url}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>
            ) : null}

            {/* GitHub Link Section */}
            {project.github_url && (
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-lg text-muted-foreground">
                  Full Project on{" "}
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
                    data-testid="link-github"
                  >
                    <Github className="h-5 w-5" />
                    Github
                  </a>
                </p>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
