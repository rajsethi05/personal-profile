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

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform Testing Framework",
      description: "Comprehensive test automation suite for a major e-commerce platform serving 2M+ users daily. Built from ground up with modern testing tools and methodologies.",
      category: "Test Automation",
      status: "Completed",
      duration: "8 months",
      team: "5 members",
      client: "RetailTech Solutions",
      technologies: ["Selenium WebDriver", "Cypress", "REST Assured", "Jenkins", "Docker", "TestNG"],
      results: [
        "70% reduction in manual testing time",
        "95% test coverage achieved",
        "50+ critical bugs prevented from production",
        "40% faster release cycles"
      ],
      challenges: [
        "Complex microservices architecture with 200+ API endpoints",
        "Cross-browser compatibility across 15+ browsers",
        "High-traffic load testing requirements",
        "Integration with legacy payment systems"
      ],
      solutions: [
        "Implemented parallel test execution across multiple environments",
        "Created custom page object model framework",
        "Established CI/CD pipeline with automated test execution",
        "Built comprehensive API testing suite with data-driven tests"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      icon: Globe,
      color: "primary"
    },
    {
      id: 2,
      title: "Mobile Banking Security Testing",
      description: "End-to-end security and performance testing for a mobile banking application with 99.9% uptime requirement and PCI DSS compliance.",
      category: "Security & Mobile Testing",
      status: "Completed",
      duration: "6 months",
      team: "4 members",
      client: "FinanceSecure Bank",
      technologies: ["Appium", "OWASP ZAP", "Burp Suite", "JMeter", "Charles Proxy", "Xcode Instruments"],
      results: [
        "Zero security vulnerabilities in production",
        "99.95% uptime achieved",
        "30% improvement in app performance",
        "100% compliance with banking regulations"
      ],
      challenges: [
        "Strict security and compliance requirements",
        "Complex biometric authentication testing",
        "Multi-platform mobile testing (iOS/Android)",
        "Real-time transaction processing validation"
      ],
      solutions: [
        "Developed comprehensive security test scenarios",
        "Implemented device farm testing infrastructure",
        "Created automated accessibility testing suite",
        "Established performance benchmarking framework"
      ],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      icon: Shield,
      color: "accent"
    },
    {
      id: 3,
      title: "Microservices API Testing Platform",
      description: "Complete API testing framework for a microservices architecture with 200+ endpoints, handling millions of daily transactions.",
      category: "API Testing",
      status: "Completed",
      duration: "5 months",
      team: "3 members",
      client: "CloudTech Enterprise",
      technologies: ["REST Assured", "Postman", "Newman", "Karate", "WireMock", "Docker Compose"],
      results: [
        "100% API coverage achieved",
        "80% reduction in API-related bugs",
        "90% faster API testing cycles",
        "Automated contract testing implementation"
      ],
      challenges: [
        "Complex service dependencies and data flows",
        "Dynamic data validation requirements",
        "Multiple authentication mechanisms",
        "High-volume load testing needs"
      ],
      solutions: [
        "Built comprehensive test data management system",
        "Implemented contract-based testing approach",
        "Created reusable API testing components",
        "Established performance baseline monitoring"
      ],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      icon: Database,
      color: "secondary"
    },
    {
      id: 4,
      title: "Healthcare SaaS Performance Optimization",
      description: "Performance testing and optimization for a healthcare SaaS platform serving 500+ hospitals with critical patient data management.",
      category: "Performance Testing",
      status: "Completed",
      duration: "4 months",
      team: "6 members",
      client: "HealthTech Global",
      technologies: ["JMeter", "LoadRunner", "New Relic", "Grafana", "K6", "BlazeMeter"],
      results: [
        "60% improvement in page load times",
        "99.9% uptime during peak hours",
        "50% reduction in server response times",
        "300% increase in concurrent user capacity"
      ],
      challenges: [
        "HIPAA compliance requirements",
        "Critical system availability needs",
        "Complex reporting and analytics features",
        "Integration with multiple EHR systems"
      ],
      solutions: [
        "Implemented comprehensive performance monitoring",
        "Created realistic load testing scenarios",
        "Established performance regression testing",
        "Built automated performance alerting system"
      ],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      icon: TrendingUp,
      color: "primary"
    },
    {
      id: 5,
      title: "IoT Device Testing Automation",
      description: "Automated testing framework for IoT devices and cloud integration, covering hardware compatibility and real-time data processing.",
      category: "IoT & Integration Testing",
      status: "Completed",
      duration: "7 months",
      team: "4 members",
      client: "SmartHome Technologies",
      technologies: ["Python", "MQTT", "InfluxDB", "Grafana", "Raspberry Pi", "Arduino"],
      results: [
        "95% reduction in manual device testing",
        "100+ IoT devices validated",
        "Real-time monitoring implementation",
        "Edge case scenario coverage"
      ],
      challenges: [
        "Diverse hardware platforms and protocols",
        "Network connectivity variations",
        "Real-time data synchronization",
        "Battery life and power consumption testing"
      ],
      solutions: [
        "Built hardware-in-the-loop testing framework",
        "Created network simulation environments",
        "Implemented automated device provisioning",
        "Established continuous integration for IoT devices"
      ],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      icon: Settings,
      color: "accent"
    },
    {
      id: 6,
      title: "Blockchain Application Testing Suite",
      description: "Comprehensive testing framework for blockchain-based financial application with smart contract validation and security testing.",
      category: "Blockchain & Security Testing",
      status: "Completed",
      duration: "9 months",
      team: "5 members",
      client: "CryptoFinance Corp",
      technologies: ["Truffle", "Ganache", "Web3.js", "Solidity", "MetaMask", "Hardhat"],
      results: [
        "Zero smart contract vulnerabilities",
        "100% transaction validation coverage",
        "Gas optimization improvements",
        "Multi-chain compatibility achieved"
      ],
      challenges: [
        "Complex smart contract logic validation",
        "Gas fee optimization requirements",
        "Multi-blockchain compatibility",
        "Regulatory compliance testing"
      ],
      solutions: [
        "Developed smart contract testing framework",
        "Implemented automated security scanning",
        "Created blockchain network simulation",
        "Built comprehensive audit trail system"
      ],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      icon: Shield,
      color: "secondary"
    }
  ];

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
              8+ Years Experience
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
