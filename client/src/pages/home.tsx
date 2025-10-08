import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
  Mail,
  MapPin,
  Calendar,
  Building
} from "lucide-react";
import workExperienceData from "@/data/workexp.json";
import skillsData from "@/data/skills.json";
import offeringsData from "@/data/offerings.json";

export default function Home() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const handleSendMessage = async () => {
    if (!fromEmail.trim()) {
      alert('Please enter your email address');
      return;
    }

    if (!contactMessage.trim()) {
      alert('Please enter a message');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fromEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toEmail: 'raj.sethi05@gmail.com',
          fromEmail: fromEmail,
          message: contactMessage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Message sent successfully!');
        setContactMessage('');
        setFromEmail('');
        setIsContactDialogOpen(false);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Send error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  // Icon mapping for JSON data
  const iconMap = {
    CheckCircle,
    Code,
    BarChart3,
    Zap,
    Shield,
    RefreshCw,
    HelpCircle,
    Users
  };

  const workExperience = workExperienceData;
  
  const skillCategories = skillsData.map(skill => ({
    ...skill,
    icon: iconMap[skill.icon]
  }));

  const offerings = offeringsData.map(offering => ({
    ...offering,
    icon: iconMap[offering.icon]
  }));

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <div className="mb-8 animate-fade-in">
            <img
              src="/uploads/profile_picture.jpg"
              alt="Senior QA Engineer"
              className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full mx-auto shadow-2xl border-4 border-accent object-contain"
              data-testid="img-profile"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 animate-slide-up">
            Raj Kumar Sethi
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl mb-2 font-bold opacity-90 animate-slide-up">
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
              onClick={() => setIsContactDialogOpen(true)}
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
                <Card 
                  className="ml-12 md:ml-0 md:w-5/12 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => handleJobClick(job)}
                  data-testid={`card-job-${index}`}
                >
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
                    <p className="text-muted-foreground text-sm">{job.location}</p>
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

      {/* Job Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {selectedJob.title}
                </DialogTitle>
                <DialogDescription className="text-lg">
                  <div className="flex flex-col space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Building className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-accent">{selectedJob.company}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedJob.period}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedJob.teamSize}</span>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-primary" />
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {selectedJob.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Responsibilities */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-accent" />
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-muted-foreground">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Notable Projects */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-secondary-foreground" />
                    Notable Projects
                  </h4>
                  <ul className="space-y-3">
                    {selectedJob.projects.map((project, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-secondary-foreground mt-1">•</span>
                        <span className="text-muted-foreground">{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Contact Raj
            </DialogTitle>
            <DialogDescription>
              Send me a message and I'll get back to you soon.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                From Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                data-testid="input-from-email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                To Email
              </label>
              <input
                type="email"
                value="raj.sethi05@gmail.com"
                readOnly
                className="w-full px-3 py-2 border border-border rounded-md bg-muted text-muted-foreground cursor-not-allowed"
                data-testid="input-contact-email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Enter your message here..."
                rows={5}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                data-testid="textarea-contact-message"
              />
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={isSending || !contactMessage.trim() || !fromEmail.trim()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-send-message"
            >
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
