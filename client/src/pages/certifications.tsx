import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

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
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                    <div 
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        setSelectedCert(cert);
                        setIsDialogOpen(true);
                      }}
                    >
                      <img
                        src={cert.cert_path}
                        alt={`Certification ${index + 1}`}
                        className="w-full h-auto object-contain"
                        data-testid={`img-certification-${index}`}
                      />
                    </div>
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

      {/* Certificate Preview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
            <X className="h-6 w-6 text-white bg-black/50 rounded-full p-1" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {selectedCert && (
            <div className="w-full h-full flex items-center justify-center p-4">
              <img
                src={selectedCert.cert_path}
                alt="Certificate"
                className="max-w-full max-h-[85vh] object-contain"
                data-testid="img-certificate-preview"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
