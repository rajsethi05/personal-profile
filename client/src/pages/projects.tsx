import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Zap } from "lucide-react";
import { Link } from "wouter";

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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProjects = async () => {
      try {
        setLoading(true);
        const profileId = import.meta.env.VITE_PROFILE_ID || "default";
        console.log("🔍 VITE_PROFILE_ID:", import.meta.env.VITE_PROFILE_ID);
        console.log("🔍 profileId:", profileId);

        const projectFile =
          profileId === "qa"
            ? "/uploads/qa_projects.json"
            : profileId === "ai"
              ? "/uploads/ai_projects.json"
              : "/uploads/qa_projects.json";

        console.log("🔍 Loading projects from:", projectFile);

        const response = await fetch(projectFile);
        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        const data = await response.json();

        const transformedData = data.map((project: any) => ({
          ...project,
          image: project.image?.replace("client/public", "") || project.image,
          project_url:
            project.project_url?.replace("client/public", "") ||
            project.project_url,
        }));

        setProjects(transformedData);
      } catch (error) {
        console.error("Error loading projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);
  // Calculate years of experience from March 2014 to today
  const calculateExperience = () => {
    const startDate = new Date(2014, 2); // March 2014 (month is 0-indexed)
    const today = new Date();
    const years = today.getFullYear() - startDate.getFullYear();
    const months = today.getMonth() - startDate.getMonth();

    // If we haven't reached the month yet this year, subtract 1
    if (months < 0) {
      return years - 1;
    }
    return years;
  };

  const yearsOfExperience = calculateExperience();

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "in progress":
        return "bg-blue-500";
      case "planning":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
            Projects Portfolio
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Comprehensive projects demonstrating expertise across various
            technologies and industries.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  {/* Image Section */}
                  <div
                    className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                  >
                    {project.image ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 lg:h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full h-64 lg:h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <p className="text-muted-foreground">
                          No image available
                        </p>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-primary text-primary-foreground">
                          {project.category}
                        </Badge>
                        <div className="flex space-x-2">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                size="sm"
                                variant="secondary"
                                className="h-8 w-8 p-0"
                                data-testid={`button-github-${index}`}
                              >
                                <Github className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-8">
                    {project.status && (
                      <div className="flex items-center space-x-2 mb-4">
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}
                        ></div>
                        <span className="text-sm text-muted-foreground font-medium capitalize">
                          {project.status}
                        </span>
                      </div>
                    )}

                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-accent" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="text-xs"
                            data-testid={`badge-tech-${index}-${techIndex}`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/project-details/${index}`}>
                        <Button
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                          data-testid={`button-view-details-${index}`}
                        >
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        data-testid={`button-case-study-${index}`}
                      >
                        Case Study
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        data-testid={`button-contact-project-${index}`}
                      >
                        Discuss Similar Project
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Have a Similar Project in Mind?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let's connect and discuss how we can help each other or
                  collaborate to work in the idea.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-discuss-project"
                  >
                    <a href="mailto:raj.sethi05@gmail.com">Let's Discuss</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
