
import { useState, useEffect, useRef } from 'react';

const StatsSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { number: 500, suffix: '+', label: 'Clients Served' },
    { number: 95, suffix: '%', label: 'Client Satisfaction' },
    { number: 250, suffix: '%', label: 'Average Lead Increase' },
    { number: 2, suffix: '+', label: 'Years Experience' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const CountUp = ({ end, suffix, duration = 2000 }: { end: number; suffix: string; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!inView) return;

      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [inView, end, duration]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <section ref={sectionRef} className="relative z-10 px-6 md:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Proven Results
          </h2>
          <p className="text-xl text-white/80">
            Numbers that speak for themselves
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                <CountUp end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-white/80 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
