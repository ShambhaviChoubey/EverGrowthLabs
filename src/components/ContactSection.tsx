
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User } from '@supabase/supabase-js';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessDescription: '',
    currentMarketingChallenges: '',
    primaryGoals: '',
    monthlyMarketingBudget: ''
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get current user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Pre-fill form with user data if available
        setFormData(prev => ({
          ...prev,
          email: session.user.email || '',
          firstName: session.user.user_metadata?.first_name || '',
          lastName: session.user.user_metadata?.last_name || ''
        }));
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setFormData(prev => ({
          ...prev,
          email: session.user.email || '',
          firstName: session.user.user_metadata?.first_name || '',
          lastName: session.user.user_metadata?.last_name || ''
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submissionData = {
        ...formData,
        user_id: user?.id || null,
        status: 'pending'
      };

      const { error } = await supabase
        .from('marketing_audits')
        .insert([{
          first_name: submissionData.firstName,
          last_name: submissionData.lastName,
          email: submissionData.email,
          phone: submissionData.phone,
          business_name: submissionData.businessName,
          business_description: submissionData.businessDescription,
          current_marketing_challenges: submissionData.currentMarketingChallenges,
          primary_goals: submissionData.primaryGoals,
          monthly_marketing_budget: submissionData.monthlyMarketingBudget,
          user_id: submissionData.user_id,
          status: submissionData.status
        }]);

      if (error) {
        console.error('Supabase error:', error);
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: error.message || "There was an error submitting your request. Please try again.",
        });
      } else {
        toast({
          title: "Request Submitted!",
          description: "We'll contact you within 24 hours to schedule your free marketing audit.",
        });
        
        // Reset form
        setFormData({
          firstName: user?.user_metadata?.first_name || '',
          lastName: user?.user_metadata?.last_name || '',
          email: user?.email || '',
          phone: '',
          businessName: '',
          businessDescription: '',
          currentMarketingChallenges: '',
          primaryGoals: '',
          monthlyMarketingBudget: ''
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="contact" className="relative z-10 px-6 md:px-8 py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Your Free Marketing Audit
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover untapped opportunities to grow your home services business. Our expert team will analyze your current marketing efforts and provide actionable recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Request Your Free Audit</CardTitle>
              <CardDescription className="text-white/80">
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-white">Business Name</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    placeholder="Your Business Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription" className="text-white">Business Description</Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    placeholder="Briefly describe your home services business..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges" className="text-white">Current Marketing Challenges</Label>
                  <Textarea
                    id="challenges"
                    value={formData.currentMarketingChallenges}
                    onChange={(e) => handleInputChange('currentMarketingChallenges', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    placeholder="What marketing challenges are you currently facing?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals" className="text-white">Primary Goals</Label>
                  <Textarea
                    id="goals"
                    value={formData.primaryGoals}
                    onChange={(e) => handleInputChange('primaryGoals', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    placeholder="What are your main business goals for the next 12 months?"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-white">Monthly Marketing Budget</Label>
                  <Select value={formData.monthlyMarketingBudget} onValueChange={(value) => handleInputChange('monthlyMarketingBudget', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-1000">Under $1,000</SelectItem>
                      <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                      <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="over-10000">Over $10,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg py-3"
                >
                  {loading ? 'Submitting...' : 'Get My Free Audit'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Phone className="h-8 w-8 text-orange-400" />
                  <div>
                    <h3 className="text-white font-semibold">Call Us</h3>
                    <p className="text-white/80">(555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Mail className="h-8 w-8 text-orange-400" />
                  <div>
                    <h3 className="text-white font-semibold">Email Us</h3>
                    <p className="text-white/80">hello@evergrowthlabs.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-8 w-8 text-orange-400" />
                  <div>
                    <h3 className="text-white font-semibold">Visit Us</h3>
                    <p className="text-white/80">123 Business Ave<br />Suite 100<br />Your City, ST 12345</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">What You'll Get:</h3>
              <ul className="text-white/80 space-y-2">
                <li>• Comprehensive marketing analysis</li>
                <li>• Competitor research report</li>
                <li>• Custom growth strategy</li>
                <li>• ROI projections</li>
                <li>• 30-minute consultation call</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
