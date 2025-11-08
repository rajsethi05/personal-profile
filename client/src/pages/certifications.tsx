import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

export default function Certifications() {
  const [certImages, setCertImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadCertifications = async () => {
      try {
        setLoading(true);
        const profileId = import.meta.env.VITE_PROFILE_ID || 'qa';
        console.log('🔍 Loading certifications for profile:', profileId);
        
        const certFolder = profileId === 'ai' 
          ? '/uploads/ai_certifications/' 
          : '/uploads/qa_certifications/';
        
        console.log('🔍 Certification folder:', certFolder);
        
        // Fetch the directory listing (we'll need to manually list the files)
        // Since we can't list directory contents in the browser, we'll try to load known images
        // For now, let's use a simple approach: try to load images with common patterns
        
        const possibleImages = [
          'data_visualiazation.png',
          'cert1.png', 'cert2.png', 'cert3.png', 'cert4.png', 'cert5.png',
          'cert1.jpg', 'cert2.jpg', 'cert3.jpg', 'cert4.jpg', 'cert5.jpg',
          'certificate1.png', 'certificate2.png', 'certificate3.png',
          'istqb.png', 'aws.png', 'selenium.png', 'agile.png'
        ];
        
        const validImages: string[] = [];
        
        for (const img of possibleImages) {
          const imgPath = certFolder + img;
          try {
            const response = await fetch(imgPath, { method: 'HEAD' });
            if (response.ok) {
              validImages.push(imgPath);
            }
          } catch (e) {
            // Image doesn't exist, skip
          }
        }
        
        setCertImages(validImages);
      } catch (error) {
        console.error('Error loading certifications:', error);
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
          ) : certImages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certImages.map((imgPath, index) => (
                <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" data-testid={`card-certification-${index}`}>
                  <CardContent className="p-0">
                    <img 
                      src={imgPath} 
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
