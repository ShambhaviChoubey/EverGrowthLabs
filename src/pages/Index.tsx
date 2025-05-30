
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Phone, Mail, MapPin, Star, Zap, TrendingUp, Users } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AnimatedBackground from '../components/AnimatedBackground';
import ServiceSection from '../components/ServiceSection';
import StatsSection from '../components/StatsSection';
import ContactSection from '../components/ContactSection';
import CaseStudiesSection from '../components/CaseStudiesSection';
import AIChatbot from '../components/AIChatbot';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out",
      });
    } else {
      toast({
        title: "Logged out successfully",
        description: "You have been logged out.",
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      <AnimatedBackground mousePosition={mousePosition} />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 md:p-8">
        <button 
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-white hover:text-orange-400 transition-colors duration-300"
        >
          EverGrowthLabs
        </button>
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('services')}
            className="text-white/80 hover:text-white transition-colors duration-300 hover:text-orange-400"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('case-studies')}
            className="text-white/80 hover:text-white transition-colors duration-300 hover:text-orange-400"
          >
            Case Studies
          </button>
          <button 
            onClick={() => navigate('/about')}
            className="text-white/80 hover:text-white transition-colors duration-300 hover:text-orange-400"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-white/80 hover:text-white transition-colors duration-300 hover:text-orange-400"
          >
            Contact
          </button>
          {user ? (
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all duration-300"
            >
              Log Out
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => navigate('/auth')}
              className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 transition-all duration-300"
            >
              Get Started
            </Button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-300 border-orange-500/30 hover:bg-gradient-to-r hover:from-orange-500/30 hover:to-purple-500/30">
            ⚡ Leading Home Services Marketing Agency
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Grow Your Home Services Business
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Data-driven marketing strategies that generate leads and drive growth for plumbing, HVAC, electrical, landscaping, and all home service businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Button 
                size="lg" 
                onClick={() => scrollToSection('services')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg px-8 py-4 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg px-8 py-4 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
              >
                Start Growing Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/case-studies')}
              className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 text-lg px-8 py-4 transition-all duration-300"
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose EverGrowthLabs?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We understand the home services industry inside and out. Our proven strategies deliver results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-400 mb-4 group-hover:text-orange-400 transition-colors duration-300" />
                <CardTitle className="text-white text-xl">Fast Results</CardTitle>
                <CardDescription className="text-white/80">
                  See increased leads within 30 days with our proven marketing strategies
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 group">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-400 mb-4 group-hover:text-emerald-400 transition-colors duration-300" />
                <CardTitle className="text-white text-xl">Growth Focused</CardTitle>
                <CardDescription className="text-white/80">
                  Every strategy is designed to scale your business and increase revenue
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-400 mb-4 group-hover:text-sky-400 transition-colors duration-300" />
                <CardTitle className="text-white text-xl">Industry Experts</CardTitle>
                <CardDescription className="text-white/80">
                  Our team specializes exclusively in home services marketing
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <StatsSection />
      <CaseStudiesSection />
      <ServiceSection />
      <ContactSection />
      
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Index;
