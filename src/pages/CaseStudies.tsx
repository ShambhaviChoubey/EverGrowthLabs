
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Users, Target, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const CaseStudies = () => {
  const navigate = useNavigate();

  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['all-case-studies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('published', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
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
        <div className="px-6 md:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Success Stories</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Real results from real home service businesses we've helped grow
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="bg-white/5 backdrop-blur-sm border-white/10 animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-white/20 rounded mb-2"></div>
                    <div className="h-6 bg-white/20 rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-4 bg-white/20 rounded"></div>
                      <div className="h-4 bg-white/20 rounded"></div>
                      <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      <section className="px-6 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Real results from real home service businesses we've helped grow. These case studies showcase the measurable impact of our data-driven marketing strategies.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies?.map((caseStudy) => (
              <Card key={caseStudy.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group h-full">
                <CardHeader>
                  {caseStudy.featured && (
                    <Badge className="w-fit mb-2 bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-300 border-orange-500/30">
                      ⭐ Featured Success
                    </Badge>
                  )}
                  <CardTitle className="text-white text-xl mb-2 group-hover:text-orange-400 transition-colors">
                    {caseStudy.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-white/70 mb-4">
                    <span className="font-semibold">{caseStudy.client_name}</span>
                    <span>•</span>
                    <span>{caseStudy.client_industry}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className="text-orange-400 font-semibold mb-2">Challenge</h4>
                    <p className="text-white/80 text-sm leading-relaxed mb-4">
                      {caseStudy.challenge_description}
                    </p>
                    
                    <h4 className="text-blue-400 font-semibold mb-2">Solution</h4>
                    <p className="text-white/80 text-sm leading-relaxed mb-4">
                      {caseStudy.solution_description}
                    </p>

                    <h4 className="text-green-400 font-semibold mb-2">Results</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {caseStudy.results_description}
                    </p>
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="text-2xl font-bold text-green-400">
                        {caseStudy.roi_percentage}%
                      </div>
                      <div className="text-xs text-white/60">ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-blue-400">
                        {caseStudy.leads_generated}
                      </div>
                      <div className="text-xs text-white/60">Leads/Month</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Calendar className="h-4 w-4 text-orange-400" />
                      </div>
                      <div className="text-2xl font-bold text-orange-400">
                        {caseStudy.campaign_duration_months}
                      </div>
                      <div className="text-xs text-white/60">Months</div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  {caseStudy.testimonial_quote && (
                    <blockquote className="border-l-4 border-orange-500/50 pl-4 italic text-white/80 text-sm">
                      "{caseStudy.testimonial_quote}"
                      <footer className="text-xs text-white/60 mt-2 not-italic">
                        — {caseStudy.testimonial_author}, {caseStudy.testimonial_position}
                      </footer>
                    </blockquote>
                  )}

                  {/* Services Used */}
                  {caseStudy.services_used && (
                    <div className="flex flex-wrap gap-1">
                      {caseStudy.services_used.slice(0, 4).map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/20 text-white/70">
                          {service}
                        </Badge>
                      ))}
                      {caseStudy.services_used.length > 4 && (
                        <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                          +{caseStudy.services_used.length - 4}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Budget Range */}
                  {caseStudy.budget_range && (
                    <div className="text-sm text-white/60">
                      <span className="font-semibold">Budget Range:</span> {caseStudy.budget_range}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Be Our Next Success Story?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join these successful businesses and start seeing real results from your marketing efforts.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg px-8 py-4 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
