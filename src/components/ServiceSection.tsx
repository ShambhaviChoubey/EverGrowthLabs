
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const ServiceSection = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (error) throw error;
      return data;
    },
  });

  // Fallback services if database is empty or loading
  const fallbackServices = [
    'Carpentry', 'Ceilings', 'Chimney', 'Commercial', 'Concrete', 'Counters',
    'Decks & Patio', 'Demolition', 'Designers', 'Disaster Recovery', 'Drywall & Plaster',
    'Excavation', 'Fencing', 'Fireplace', 'Flooring', 'Garage Doors', 'Gardening',
    'Gutters', 'Handyman', 'Hardscaping', 'Home Inspecting', 'Home Theatre',
    'Lawn Care', 'Locksmith', 'Masonry', 'Pest Control', 'Pool Construction',
    'Power Washing', 'Property Management', 'Railing', 'Screen Doors', 'Siding',
    'Snow Removal', 'Solar', 'Tiling', 'Tree Services'
  ];

  const displayServices = services?.map(service => service.name) || fallbackServices;

  return (
    <section id="services" className="relative z-10 px-6 md:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Home Service Industries - Compact Design */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Home Service Industries We Serve
          </h3>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Specialized marketing strategies for every type of home service business
          </p>
        </div>

        {/* Compact Grid with Minimalist Design */}
        <div className="relative">
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-8">
            {displayServices.map((service, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center hover:from-orange-500/20 hover:to-red-500/20 hover:border-orange-400/40 transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  animationDelay: `${index * 0.03}s`,
                }}
              >
                <span className="text-white/90 font-medium text-xs md:text-sm group-hover:text-white transition-colors leading-tight block">
                  {service}
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 rounded-xl transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* Gradient overlay for visual effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent pointer-events-none rounded-2xl" />
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg px-8 py-4 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300">
            Get Your Free Marketing Audit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
