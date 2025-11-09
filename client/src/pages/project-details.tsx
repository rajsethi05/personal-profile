import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Github, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden">
        {project.image ? (
          <>
            <img
              src={project.image.startsWith("/") ? project.image : `/${project.image}`}
              alt={project.title}
              className="w-full h-full object-cover"
              data-testid="img-project-banner"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background"></div>
          </>
        ) : (
          <div className="w-full h-full hero-gradient"></div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <Badge className="mb-4 bg-primary text-primary-foreground" data-testid="badge-category">
              {project.category}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4" data-testid="text-project-title">
              {project.title}
            </h1>
            <p className="text-xl text-white/90 mb-6" data-testid="text-project-description">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {project.github_url && (
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-white/90"
                  data-testid="button-github"
                >
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </a>
                </Button>
              )}
              <Link href="/projects">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  data-testid="button-back-projects"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 mr-2 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Technologies & Tools</h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {project.technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-base px-4 py-2 bg-background hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                data-testid={`badge-tech-${index}`}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className={fileType === "pdf" ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" : "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"}>
          {fileType === "pdf" && pdfUrl ? (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-[800px] border-0"
                  title="PDF Viewer"
                  data-testid="content-pdf"
                />
              </CardContent>
            </Card>
          ) : (fileType === "markdown" || fileType === "json") && markdownContent ? (
            <Card>
              <CardContent className="p-8">
                <article className="prose prose-lg dark:prose-invert max-w-none"
                  data-testid="content-markdown"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      img: ({node, ...props}) => (
                        <img {...props} className="rounded-lg shadow-lg max-w-full h-auto" loading="lazy" />
                      )
                    }}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </article>
              </CardContent>
            </Card>
          ) : null}

          {/* GitHub Link Footer */}
          {project.github_url && (
            <div className="mt-12 pt-8 border-t border-border">
              <Card className="bg-muted/50">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Want to see the code?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Check out the complete project repository on GitHub
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-github-footer"
                  >
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-5 w-5" />
                      View Full Project on GitHub
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
