import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, CheckCircle, Search, MessageSquare, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-civic.jpg";
import featureLearn from "@/assets/feature-learn.png";
import featureForum from "@/assets/feature-forum.png";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20 md:py-32"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 61, 122, 0.95), rgba(0, 81, 162, 0.9)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Understand Laws. Join the Conversation.<br />
            <span className="text-secondary">Shape Kenya's Future.</span>
          </h1>
          <p className="mb-8 text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Civic Voice connects Kenyan citizens to parliamentary documents and empowers public participation through AI-powered learning and interactive discussions.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl text-foreground">
              Empowering Public Participation
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Civic Voice is Kenya's premier platform for civic education and public engagement. We bridge the gap between citizens and governance by making parliamentary documents accessible, understandable, and actionable. Through AI-powered guidance and community-driven discussions, we're building a more informed and engaged citizenry.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Platform Features
          </h2>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="border-2 hover:shadow-[var(--shadow-medium)] transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <img src={featureLearn} alt="Browse and Learn" className="h-32 w-32" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold">Browse and Learn</h3>
                <p className="text-muted-foreground">
                  Access Acts, Bills, and the Constitution with AI-powered guidance. Ask questions, get explanations, and truly understand the laws that govern Kenya.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-[var(--shadow-medium)] transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <img src={featureForum} alt="Join the Forum" className="h-32 w-32" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold">Join the Forum</h3>
                <p className="text-muted-foreground">
                  Engage in meaningful discussions about legislation. Share your views, debate with fellow citizens, and contribute to public discourse on important issues.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  1
                </div>
              </div>
              <div className="mb-4 flex justify-center">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Sign Up & Verify</h3>
              <p className="text-muted-foreground">
                Create your account using your email and Kenyan National ID for secure verification.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  2
                </div>
              </div>
              <div className="mb-4 flex justify-center">
                <Search className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Browse Documents</h3>
              <p className="text-muted-foreground">
                Explore our comprehensive library of Acts, Bills, and constitutional documents with AI assistance.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  3
                </div>
              </div>
              <div className="mb-4 flex justify-center">
                <MessageSquare className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Participate</h3>
              <p className="text-muted-foreground">
                Join discussions, share your opinions, and engage with your fellow citizens on important legislation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
