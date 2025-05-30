
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const CaseStudiesSection = () => {
  const navigate = useNavigate();

  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['case-studies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('published', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section id="case-studies" className="relative z-10 px-6 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Real results from real home service businesses we've helped grow
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
      </section>
    );
  }

  return (
    <section id="case-studies" className="relative z-10 px-6 md:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Real results from real home service businesses we've helped grow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {caseStudies?.map((caseStudy) => (
            <Card key={caseStudy.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group">
              <CardHeader>
                {caseStudy.featured && (
                  <Badge className="w-fit mb-2 bg-gradient-to-r from-orange-500/20 to-purple-500/20 text-orange-300 border-orange-500/30">
                    Featured Success
                  </Badge>
                )}
                <CardTitle className="text-white text-xl mb-2">{caseStudy.title}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-white/70">
                  <span>{caseStudy.client_name}</span>
                  <span>•</span>
                  <span>{caseStudy.client_industry}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/80 text-sm leading-relaxed">
                  {caseStudy.challenge_description}
                </p>
                
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
                      <Target className="h-4 w-4 text-orange-400" />
                    </div>
                    <div className="text-2xl font-bold text-orange-400">
                      {caseStudy.campaign_duration_months}
                    </div>
                    <div className="text-xs text-white/60">Months</div>
                  </div>
                </div>

                {caseStudy.testimonial_quote && (
                  <blockquote className="border-l-4 border-orange-500/50 pl-4 italic text-white/80 text-sm">
                    "{caseStudy.testimonial_quote}"
                    <footer className="text-xs text-white/60 mt-2">
                      — {caseStudy.testimonial_author}, {caseStudy.testimonial_position}
                    </footer>
                  </blockquote>
                )}

                {caseStudy.services_used && (
                  <div className="flex flex-wrap gap-1">
                    {caseStudy.services_used.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-white/20 text-white/70">
                        {service}
                      </Badge>
                    ))}
                    {caseStudy.services_used.length > 3 && (
                      <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                        +{caseStudy.services_used.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={() => navigate('/case-studies')}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg px-8 py-4 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
          >
            View All Case Studies
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
