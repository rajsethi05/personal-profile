import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink } from "lucide-react";

interface Certificate {
  cert_path: string;
  cert_url: string;
}

interface CertsData {
  qa: Certificate[];
  ai: Certificate[];
}

export default function Certifications() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadCertifications = async () => {
      try {
        setLoading(true);
        const profileId = import.meta.env.VITE_PROFILE_ID || "qa";
        console.log("🔍 Loading certifications for profile:", profileId);

        const response = await fetch("/uploads/certs.json");
        if (!response.ok) {
          throw new Error("Failed to load certifications");
        }

        const data: CertsData = await response.json();
        const certs = profileId === "ai" ? data.ai : data.qa;

        console.log("🔍 Loaded certificates:", certs);
        setCertificates(certs);
      } catch (error) {
        console.error("Error loading certifications:", error);
        setCertificates([]);
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
            Industry-recognized certifications demonstrating expertise and
            commitment to excellence
          </p>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Professional Certifications
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
            <p className="text-lg text-muted-foreground mt-4">
              Industry-recognized credentials demonstrating expertise and
              commitment to excellence
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-muted-foreground">
                Loading certifications...
              </p>
            </div>
          ) : certificates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert, index) => (
                <Card
                  key={index}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  data-testid={`card-certification-${index}`}
                >
                  <CardContent className="p-0">
                    <img
                      src={cert.cert_path}
                      alt={`Certification ${index + 1}`}
                      className="w-full h-auto object-contain"
                      data-testid={`img-certification-${index}`}
                    />
                    <div className="p-4">
                      <Button
                        asChild
                        className="w-full"
                        data-testid={`button-verify-${index}`}
                      >
                        <a
                          href={cert.cert_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Verify Credentials
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No certifications found for this profile.
              </p>
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
                These certifications represent my commitment to staying current
                with industry best practices and emerging technologies in
                quality assurance and software testing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="button-discuss-expertise"
                >
                  <a href="mailto:raj.sethi05@gmail.com">
                    Discuss Your Testing Needs
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  data-testid="button-view-resume"
                >
                  <a
                    href={
                      import.meta.env.VITE_PROFILE_ID === 'ai'
                        ? '/uploads/ai_resume/Raj_Sethi_Resume.pdf'
                        : '/uploads/qa_resume/Raj_Sethi_Resume.pdf'
                    }
                    download="Raj_Sethi_Resume.pdf"
                  >
                    Download Full Resume
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
