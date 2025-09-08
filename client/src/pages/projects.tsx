import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  Target,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Settings,
  Smartphone,
  Globe,
  Database
} from "lucide-react";
import detailedProjectsData from "@/data/detailed-projects.json";

export default function Projects() {
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

  // Icon mapping for JSON data
  const iconMap = {
    Globe,
    Shield,
    Database,
    TrendingUp,
    Settings
  };
  
  const projects = detailedProjectsData.map(project => ({
    ...project,
    icon: iconMap[project.icon]
  }));

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'in progress':
        return 'bg-blue-500';
      case 'planning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
            QA Projects Portfolio
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Comprehensive quality assurance projects demonstrating expertise across various technologies and industries
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-accent text-accent-foreground px-4 py-2">
              50+ Projects Completed
            </Badge>
            <Badge className="bg-primary/20 text-primary-foreground px-4 py-2">
              {yearsOfExperience}+ Years Experience
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground px-4 py-2">
              Multiple Industries
            </Badge>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <Card key={project.id} className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Image Section */}
                    <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <Badge className={`${
                            project.color === 'primary' ? 'bg-primary text-primary-foreground' :
                            project.color === 'accent' ? 'bg-accent text-accent-foreground' :
                            'bg-secondary text-secondary-foreground'
                          }`}>
                            {project.category}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                              <Github className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          project.color === 'primary' ? 'bg-primary/10' :
                          project.color === 'accent' ? 'bg-accent/10' :
                          'bg-secondary/10'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            project.color === 'primary' ? 'text-primary' :
                            project.color === 'accent' ? 'text-accent' :
                            'text-secondary-foreground'
                          }`} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                          <span className="text-sm text-muted-foreground font-medium">{project.status}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-3">{project.title}</h3>
                      <p className="text-muted-foreground mb-6">{project.description}</p>

                      {/* Project Details */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{project.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{project.team}</span>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Zap className="w-4 h-4 mr-2 text-accent" />
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Key Results */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-green-500" />
                          Key Results
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {project.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <Button 
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                          data-testid={`button-view-details-${project.id}`}
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="outline"
                          data-testid={`button-case-study-${project.id}`}
                        >
                          Case Study
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          data-testid={`button-contact-project-${project.id}`}
                        >
                          Discuss Similar Project
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Have a Similar Project in Mind?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Let's discuss how I can help you achieve similar results with comprehensive QA solutions 
                  tailored to your specific needs and requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-discuss-project"
                  >
                    Discuss Your Project
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    data-testid="button-get-quote"
                  >
                    Get a Quote
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
