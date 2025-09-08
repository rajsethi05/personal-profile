import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Calendar, 
  ExternalLink, 
  CheckCircle,
  Star,
  BookOpen,
  Trophy,
  Target,
  Users,
  Zap,
  Shield,
  TrendingUp
} from "lucide-react";

export default function Certifications() {
  const certifications = [
    {
      id: 1,
      title: "ISTQB Certified Tester Advanced Level - Test Automation Engineer",
      issuer: "International Software Testing Qualifications Board (ISTQB)",
      date: "March 2023",
      validUntil: "March 2026",
      credentialId: "CTAE-2023-4567",
      category: "Software Testing",
      level: "Advanced",
      description: "Advanced certification focusing on test automation design, implementation, and maintenance with emphasis on tool selection and framework development.",
      skills: ["Test Automation", "Framework Design", "Tool Selection", "Maintenance Strategies"],
      icon: Trophy,
      color: "primary",
      status: "Active",
      verificationUrl: "#"
    },
    {
      id: 2,
      title: "ISTQB Certified Tester Foundation Level",
      issuer: "International Software Testing Qualifications Board (ISTQB)",
      date: "June 2019",
      validUntil: "Lifetime",
      credentialId: "CTFL-2019-8901",
      category: "Software Testing",
      level: "Foundation",
      description: "Foundation level certification covering fundamental testing principles, techniques, and processes essential for quality assurance professionals.",
      skills: ["Testing Fundamentals", "Test Design Techniques", "Test Management", "Quality Assurance"],
      icon: Award,
      color: "primary",
      status: "Active",
      verificationUrl: "#"
    },
    {
      id: 3,
      title: "Certified Agile Testing Professional (CATP)",
      issuer: "Agile Testing Alliance",
      date: "September 2022",
      validUntil: "September 2025",
      credentialId: "CATP-2022-1234",
      category: "Agile Methodologies",
      level: "Professional",
      description: "Comprehensive certification in agile testing practices, continuous integration, and collaborative development approaches.",
      skills: ["Agile Testing", "Continuous Integration", "Scrum", "BDD/TDD"],
      icon: Users,
      color: "accent",
      status: "Active",
      verificationUrl: "#"
    },
    {
      id: 4,
      title: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "January 2023",
      validUntil: "January 2026",
      credentialId: "AWS-SAA-2023-5678",
      category: "Cloud Computing",
      level: "Associate",
      description: "Cloud architecture certification demonstrating ability to design scalable, secure, and cost-effective solutions on AWS platform.",
      skills: ["AWS Architecture", "Cloud Security", "Scalability", "Cost Optimization"],
      icon: Zap,
      color: "secondary",
      status: "Active",
      verificationUrl: "#"
    },
    {
      id: 5,
      title: "Certified Selenium WebDriver Professional",
      issuer: "Selenium Testing Certification Board",
      date: "August 2022",
      validUntil: "August 2025",
      credentialId: "SWP-2022-9012",
      category: "Test Automation",
      level: "Professional",
      description: "Advanced Selenium WebDriver certification covering complex automation scenarios, framework development, and best practices.",
      skills: ["Selenium WebDriver", "Java/Python", "Page Object Model", "Cross-browser Testing"],
      icon: Target,
      color: "primary",
      status: "Active",
      verificationUrl: "#"
    },
    {
      id: 6,
      title: "Certified API Testing Professional",
      issuer: "API Testing Institute",
      date: "November 2022",
      validUntil: "November 2025",
      credentialId: "CATP-2022-3456",
      category: "API Testing",
      level: "Professional",
      description: "Specialized certification in REST and SOAP API testing, covering authentication, data validation, and performance testing.",
      skills: ["REST API Testing", "SOAP Testing", "Postman", "Authentication Testing"],
      icon: BookOpen,
      color: "accent",
      status: "Active",
      verificationUrl: "#"
    },
    {
      id: 7,
      title: "Certified Ethical Hacker (CEH)",
      issuer: "EC-Council",
      date: "April 2023",
      validUntil: "April 2026",
      credentialId: "CEH-2023-7890",
      category: "Security Testing",
      level: "Professional",
      description: "Ethical hacking certification focusing on security testing methodologies, vulnerability assessment, and penetration testing.",
      skills: ["Security Testing", "Vulnerability Assessment", "Penetration Testing", "OWASP"],
      icon: Shield,
      color: "secondary",
      status: "Active",
      verificationUrl: "#"
    },
    {
      id: 8,
      title: "Performance Testing Certification",
      issuer: "LoadRunner University",
      date: "July 2021",
      validUntil: "July 2024",
      credentialId: "PTC-2021-2345",
      category: "Performance Testing",
      level: "Professional",
      description: "Comprehensive performance testing certification covering load testing, stress testing, and performance optimization techniques.",
      skills: ["LoadRunner", "JMeter", "Performance Analysis", "Load Testing"],
      icon: TrendingUp,
      color: "primary",
      status: "Expiring Soon",
      verificationUrl: "#"
    }
  ];

  const continuingEducation = [
    {
      title: "Advanced Mobile Testing with Appium",
      provider: "Test Automation University",
      completed: "February 2024",
      hours: "16 hours"
    },
    {
      title: "Kubernetes for QA Engineers",
      provider: "Cloud Native Testing Institute",
      completed: "December 2023",
      hours: "24 hours"
    },
    {
      title: "AI-Driven Test Automation",
      provider: "Future of Testing Academy",
      completed: "October 2023",
      hours: "12 hours"
    },
    {
      title: "Cypress Advanced Techniques",
      provider: "Cypress Academy",
      completed: "August 2023",
      hours: "8 hours"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'expiring soon':
        return 'bg-yellow-500';
      case 'expired':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'foundation':
        return 'bg-blue-500';
      case 'associate':
        return 'bg-green-500';
      case 'professional':
        return 'bg-purple-500';
      case 'advanced':
        return 'bg-red-500';
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
            Professional Certifications
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Industry-recognized certifications demonstrating expertise in quality assurance, testing methodologies, and emerging technologies
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-accent text-accent-foreground px-4 py-2">
              8+ Active Certifications
            </Badge>
            <Badge className="bg-primary/20 text-primary-foreground px-4 py-2">
              Multiple Specializations
            </Badge>
            <Badge className="bg-primary-foreground/20 text-primary-foreground px-4 py-2">
              Continuously Updated
            </Badge>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Active Certifications</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {certifications.map((cert) => {
              const IconComponent = cert.icon;
              return (
                <Card key={cert.id} className="h-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        cert.color === 'primary' ? 'bg-primary/10' :
                        cert.color === 'accent' ? 'bg-accent/10' :
                        'bg-secondary/10'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          cert.color === 'primary' ? 'text-primary' :
                          cert.color === 'accent' ? 'text-accent' :
                          'text-secondary-foreground'
                        }`} />
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(cert.status)}`}></div>
                        <span className="text-xs text-muted-foreground">{cert.status}</span>
                      </div>
                    </div>

                    {/* Title and Issuer */}
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={`text-xs ${getLevelColor(cert.level)} text-white`}>
                        {cert.level}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {cert.category}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {cert.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Key Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Issued: {cert.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Valid Until: {cert.validUntil}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-4 h-4 mr-2" />
                        <span>ID: {cert.credentialId}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-auto"
                      data-testid={`button-verify-${cert.id}`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Verify Certification
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Continuing Education */}
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Continuing Education</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
            <p className="text-lg text-muted-foreground mt-4">
              Recent courses and training programs to stay current with industry trends
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {continuingEducation.map((course, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <BookOpen className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <Badge variant="secondary" className="text-xs">
                      {course.hours}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-3">{course.provider}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                      Completed: {course.completed}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">Certification Overview</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">8+</div>
              <div className="text-muted-foreground">Active Certifications</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">5</div>
              <div className="text-muted-foreground">Specialization Areas</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">60+</div>
              <div className="text-muted-foreground">Training Hours (2023)</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">100%</div>
              <div className="text-muted-foreground">Renewal Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Interested in My Expertise?
              </h3>
              <p className="text-muted-foreground mb-6">
                These certifications represent my commitment to staying current with industry best practices 
                and emerging technologies in quality assurance and software testing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="button-discuss-expertise"
                >
                  Discuss Your Testing Needs
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  data-testid="button-view-resume"
                >
                  Download Full Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
