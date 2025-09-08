import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  CheckCircle, 
  Code, 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  HelpCircle, 
  RefreshCw,
  ArrowRight,
  Download,
  Mail
} from "lucide-react";

export default function Home() {
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

  const workExperience = [
    {
      period: "2022 - Present",
      title: "Senior QA Engineer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      achievements: [
        "Led automation testing initiatives reducing manual testing time by 60%",
        "Implemented CI/CD testing pipelines using Jenkins and Docker",
        "Mentored junior QA engineers and established testing best practices"
      ],
      type: "current"
    },
    {
      period: "2020 - 2022",
      title: "QA Engineer II",
      company: "Digital Innovation Inc",
      location: "Austin, TX",
      achievements: [
        "Developed comprehensive test suites using Selenium and Cypress",
        "Performed API testing using Postman and REST Assured",
        "Collaborated with development teams on Agile/Scrum methodologies"
      ],
      type: "previous"
    },
    {
      period: "2018 - 2020",
      title: "QA Engineer",
      company: "StartupTech Labs",
      location: "Seattle, WA",
      achievements: [
        "Executed manual testing for web and mobile applications",
        "Created detailed test cases and documentation",
        "Identified and tracked bugs using JIRA and TestRail"
      ],
      type: "early"
    }
  ];

  const skillCategories = [
    {
      title: "Testing Tools",
      icon: CheckCircle,
      skills: ["Selenium", "Cypress", "Postman", "TestRail", "JIRA"],
      color: "primary"
    },
    {
      title: "Programming",
      icon: Code,
      skills: ["JavaScript", "Python", "Java", "TypeScript", "SQL"],
      color: "accent"
    },
    {
      title: "Methodologies",
      icon: BarChart3,
      skills: ["Agile", "Scrum", "BDD", "TDD", "Risk-Based Testing"],
      color: "secondary"
    },
    {
      title: "CI/CD & DevOps",
      icon: Zap,
      skills: ["Jenkins", "Docker", "GitHub Actions", "AWS", "Kubernetes"],
      color: "primary"
    },
    {
      title: "Performance Testing",
      icon: BarChart3,
      skills: ["JMeter", "LoadRunner", "K6", "Gatling"],
      color: "accent"
    },
    {
      title: "Security Testing",
      icon: Shield,
      skills: ["OWASP", "Burp Suite", "ZAP", "Nessus"],
      color: "secondary"
    }
  ];

  const offerings = [
    {
      icon: BarChart3,
      title: "Test Strategy & Planning",
      description: "Develop comprehensive test strategies aligned with your business goals, risk assessment, and resource optimization to maximize testing ROI."
    },
    {
      icon: Zap,
      title: "Test Automation",
      description: "Build robust automation frameworks using modern tools like Selenium, Cypress, and API testing to reduce manual effort and improve test coverage."
    },
    {
      icon: BarChart3,
      title: "Performance Testing",
      description: "Ensure your applications can handle expected load with comprehensive performance testing using JMeter, LoadRunner, and cloud-based testing solutions."
    },
    {
      icon: RefreshCw,
      title: "CI/CD Integration",
      description: "Integrate automated testing into your CI/CD pipeline using Jenkins, GitHub Actions, and containerization for continuous quality assurance."
    },
    {
      icon: HelpCircle,
      title: "Quality Consulting",
      description: "Provide expert guidance on QA best practices, process improvement, tool selection, and team training to establish a culture of quality."
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Lead and mentor QA teams, establish testing standards, coordinate cross-functional collaboration, and drive quality initiatives across the organization."
    }
  ];

  const featuredProjects = [
    {
      title: "E-commerce Platform Testing",
      description: "Comprehensive test automation suite for a major e-commerce platform, reducing testing time by 70%.",
      category: "Test Automation",
      status: "completed",
      technologies: ["Selenium", "API Testing", "CI/CD"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
    },
    {
      title: "Mobile Banking App QA",
      description: "Security-focused testing for a mobile banking application with 99.9% uptime requirement.",
      category: "Mobile Testing",
      status: "completed",
      technologies: ["Appium", "Security Testing", "Performance"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
    },
    {
      title: "Microservices API Testing",
      description: "Complete API testing framework for microservices architecture with 200+ endpoints.",
      category: "API Testing",
      status: "completed",
      technologies: ["REST Assured", "Postman", "Newman"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <div className="mb-8 animate-fade-in">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
              alt="Senior QA Engineer"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto shadow-2xl border-4 border-accent"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
            Raj Kumar Sethi
          </h1>
          <p className="text-xl sm:text-2xl mb-2 font-light opacity-90 animate-slide-up">
            Senior QA Engineer
          </p>
          <p className="text-lg sm:text-xl mb-8 font-light opacity-80 animate-slide-up">
            Ensuring Quality Through Strategic Testing & Automation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 transform hover:scale-105 transition-all duration-200"
              data-testid="button-download-resume"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all duration-200"
              data-testid="button-contact"
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">About Me</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over {yearsOfExperience} years of experience in quality assurance, I specialize in building robust testing frameworks 
                and implementing comprehensive QA strategies that ensure software reliability and performance. My expertise 
                spans across manual testing, test automation, API testing, and performance optimization.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm passionate about creating testing solutions that not only catch bugs but also improve development 
                workflows and team productivity. My approach combines technical excellence with strategic thinking to 
                deliver quality software that exceeds user expectations.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Experience</h4>
                  <p className="text-3xl font-bold text-primary">{yearsOfExperience}+ Years</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Projects Completed</h4>
                  <p className="text-3xl font-bold text-accent">50+</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
                alt="QA engineer workspace"
                className="rounded-2xl shadow-2xl"
              />
              <Card className="absolute -bottom-6 -right-6 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-foreground">Available for Projects</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Timeline */}
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Work Experience</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-1 timeline-line rounded-full"></div>
            
            {workExperience.map((job, index) => (
              <div
                key={index}
                className={`timeline-item relative flex items-center mb-12 md:justify-between group ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="timeline-dot absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                
                {/* Content card */}
                <Card className="ml-12 md:ml-0 md:w-5/12 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        variant={job.type === 'current' ? 'default' : 'secondary'}
                        className={job.type === 'current' ? 'bg-primary text-primary-foreground' : ''}
                      >
                        {job.period}
                      </Badge>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        job.type === 'current' ? 'bg-primary' : 'bg-secondary'
                      }`}>
                        <CheckCircle className={`w-4 h-4 ${
                          job.type === 'current' ? 'text-primary-foreground' : 'text-secondary-foreground'
                        }`} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
                    <p className="text-accent font-semibold mb-1">{job.company}</p>
                    <p className="text-muted-foreground text-sm mb-3">{job.location}</p>
                    <ul className="text-muted-foreground space-y-2">
                      {job.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="shadow-lg border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                        category.color === 'primary' ? 'bg-primary/10' :
                        category.color === 'accent' ? 'bg-accent/10' : 'bg-secondary/10'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          category.color === 'primary' ? 'text-primary' :
                          category.color === 'accent' ? 'text-accent' : 'text-secondary-foreground'
                        }`} />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className={`skill-badge cursor-pointer transition-all duration-200 ${
                            category.color === 'primary' ? 'bg-primary/10 text-primary hover:bg-primary/20' :
                            category.color === 'accent' ? 'bg-accent/10 text-accent hover:bg-accent/20' :
                            'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What I Offer Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What I Offer</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
            <p className="text-xl text-muted-foreground mt-4">Comprehensive QA solutions tailored to your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((offering, index) => {
              const IconComponent = offering.icon;
              return (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">{offering.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {offering.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Card className="shadow-xl max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Elevate Your Quality Assurance?</h3>
                <p className="text-muted-foreground mb-6">
                  Let's discuss how I can help improve your testing processes, reduce bugs, 
                  and deliver better software quality for your users.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all duration-200"
                    data-testid="button-schedule-consultation"
                  >
                    Schedule Consultation
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    data-testid="button-start-project"
                  >
                    Start a Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
            <p className="text-xl text-muted-foreground mt-4">Quality assurance projects that delivered results</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="project-card rounded-2xl shadow-lg border border-border overflow-hidden transition-all duration-300">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-primary/10 text-primary">
                      {project.category}
                    </Badge>
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="bg-muted text-muted-foreground">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="text-primary font-semibold hover:text-primary/80 p-0"
                    data-testid={`button-view-project-${index}`}
                  >
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-all duration-200"
                data-testid="button-view-all-projects"
              >
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
