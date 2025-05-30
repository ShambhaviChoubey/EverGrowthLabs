
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Linkedin, Github, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const founders = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former VP of Marketing at a Fortune 500 company with 15+ years in home services marketing. Sarah founded EverGrowthLabs to help small businesses compete with enterprise-level marketing strategies.",
      image: "/placeholder.svg",
      linkedin: "#",
      email: "sarah@evergrowthlabs.com"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder", 
      bio: "Tech entrepreneur and full-stack developer with expertise in marketing automation and data analytics. Michael builds the technology that powers our client success.",
      image: "/placeholder.svg",
      linkedin: "#",
      email: "michael@evergrowthlabs.com"
    }
  ];

  const developers = [
    {
      name: "Alex Rodriguez",
      role: "Lead Developer",
      bio: "Senior software engineer specializing in React and modern web technologies. Alex leads our development team in creating cutting-edge marketing tools.",
      image: "/placeholder.svg",
      github: "#",
      linkedin: "#"
    },
    {
      name: "Emily Watson",
      role: "UI/UX Developer",
      bio: "Creative developer focused on user experience and interface design. Emily ensures our platforms are both beautiful and functional.",
      image: "/placeholder.svg",
      github: "#",
      linkedin: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="relative z-10 p-6 md:p-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-white hover:text-orange-400"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>

      {/* Hero Section */}
      <section className="px-6 md:px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            About EverGrowthLabs
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            We're a passionate team of marketing experts and developers dedicated to helping home service businesses thrive in the digital age.
          </p>
        </div>
      </section>

      {/* Company Mission */}
      <section className="px-6 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Our Mission</h2>
            <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              At EverGrowthLabs, we believe every home service business deserves access to world-class marketing strategies. 
              We combine deep industry knowledge with cutting-edge technology to deliver measurable results that drive real growth.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="px-6 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet Our Founders</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              The visionaries behind EverGrowthLabs who started this journey to revolutionize home services marketing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {founders.map((founder, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-1">
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      className="w-full h-full rounded-full object-cover bg-slate-800"
                    />
                  </div>
                  <CardTitle className="text-white text-2xl">{founder.name}</CardTitle>
                  <CardDescription className="text-orange-400 text-lg font-semibold">
                    {founder.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {founder.bio}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={founder.linkedin} className="text-blue-400 hover:text-blue-300">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`mailto:${founder.email}`} className="text-orange-400 hover:text-orange-300">
                        <Mail className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="px-6 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Development Team</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              The talented developers who build and maintain the technology that powers our marketing solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {developers.map((dev, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                    <img 
                      src={dev.image} 
                      alt={dev.name}
                      className="w-full h-full rounded-full object-cover bg-slate-800"
                    />
                  </div>
                  <CardTitle className="text-white text-2xl">{dev.name}</CardTitle>
                  <CardDescription className="text-blue-400 text-lg font-semibold">
                    {dev.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-white/80 mb-6 leading-relaxed">
                    {dev.bio}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={dev.github} className="text-white hover:text-gray-300">
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={dev.linkedin} className="text-blue-400 hover:text-blue-300">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 md:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Grow Together?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join the hundreds of home service businesses that trust EverGrowthLabs to drive their growth.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg px-8 py-4 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
