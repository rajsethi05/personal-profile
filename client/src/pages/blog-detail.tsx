import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface BlogPost {
  title: string;
  category: string;
  technologies: string;
  coverImage: string;
  description: string;
  githubUrl?: string;
}

export default function BlogDetail() {
  const [, params] = useRoute("/project/details/:filename");
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadBlog = async () => {
      if (!params?.filename) return;

      try {
        setLoading(true);
        const profileId = import.meta.env.VITE_PROFILE_ID || "qa";
        const blogPath = profileId === "qa" 
          ? `/uploads/qa_blogs/${params.filename}.json`
          : `/uploads/ai_blogs/${params.filename}.json`;
        
        const response = await fetch(blogPath);
        if (!response.ok) {
          throw new Error("Blog post not found");
        }
        const blogData = await response.json();
        setBlog(blogData);
      } catch (err) {
        setError("Blog post not found");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [params?.filename]);

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

  if (error || !blog) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            {error || "The requested blog post does not exist."}
          </p>
          <Link href="/projects">
            <Button>
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

        {/* Blog Header */}
        <article className="bg-card rounded-lg shadow-lg overflow-hidden">
          {/* Cover Image */}
          {blog.coverImage && (
            <div className="w-full h-64 sm:h-96 overflow-hidden">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
                data-testid="img-blog-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-8 lg:p-12">
            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              data-testid="text-blog-title"
            >
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 mb-8">
              {blog.category && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Category:
                  </span>
                  <span
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    data-testid="text-blog-category"
                  >
                    {blog.category}
                  </span>
                </div>
              )}
              {blog.technologies && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Technologies:
                  </span>
                  <span
                    className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                    data-testid="text-blog-technologies"
                  >
                    {blog.technologies}
                  </span>
                </div>
              )}
            </div>

            {/* Blog Content */}
            <style>{`
              .prose code {
                background-color: #f3f4f6 !important;
                color: #000000 !important;
                padding: 0.2rem 0.4rem !important;
                border-radius: 0.25rem !important;
              }
              .prose pre.ql-syntax {
                background-color: #f3f4f6 !important;
                color: #000000 !important;
                padding: 1rem !important;
                border-radius: 0.375rem !important;
              }
              .prose pre {
                background-color: #f3f4f6 !important;
                color: #000000 !important;
              }
              .prose pre code {
                background-color: transparent !important;
                color: #000000 !important;
              }
            `}</style>
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
              dangerouslySetInnerHTML={{ __html: blog.description }}
              data-testid="content-blog-description"
            />

            {/* GitHub Link Section */}
            {blog.githubUrl && (
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-lg text-muted-foreground">
                  Full Project on{" "}
                  <a
                    href={blog.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold"
                    data-testid="link-github"
                  >
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
