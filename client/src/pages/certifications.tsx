import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

interface CertsData {
  qa: string[];
  ai: string[];
}

export default function Certifications() {
  const [certPaths, setCertPaths] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadCertifications = async () => {
      try {
        setLoading(true);
        const profileId = import.meta.env.VITE_PROFILE_ID || 'qa';
        console.log('🔍 Loading certifications for profile:', profileId);
        
        const response = await fetch('/uploads/certs.json');
        if (!response.ok) {
          throw new Error('Failed to load certifications');
        }
        
        const data: CertsData = await response.json();
        const certs = profileId === 'ai' ? data.ai : data.qa;
        
        console.log('🔍 Loaded certificate paths:', certs);
        setCertPaths(certs);
      } catch (error) {
        console.error('Error loading certifications:', error);
        setCertPaths([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadCertifications();
  }, []);

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero Section */}
      <section className="hero-gradient py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
            Professional Certifications
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Industry-recognized certifications demonstrating expertise and commitment to excellence
          </p>
          {!loading && certPaths.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-accent text-accent-foreground px-4 py-2">
                {certPaths.length} {certPaths.length === 1 ? 'Certification' : 'Certifications'}
              </Badge>
              <Badge className="bg-primary/20 text-primary-foreground px-4 py-2">
                Professional Growth
              </Badge>
            </div>
          )}
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Professional Certifications</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
            <p className="text-lg text-muted-foreground mt-4">
              Industry-recognized credentials demonstrating expertise and commitment to excellence
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-muted-foreground">Loading certifications...</p>
            </div>
          ) : certPaths.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certPaths.map((certPath, index) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-testid={`card-certification-${index}`}>
                  <CardContent className="p-0">
                    <img 
                      src={certPath} 
                      alt={`Certification ${index + 1}`}
                      className="w-full h-auto object-contain"
                      data-testid={`img-certification-${index}`}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No certifications found for this profile.</p>
            </div>
          )}
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
