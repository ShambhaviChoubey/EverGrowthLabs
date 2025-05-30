
import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  mousePosition: { x: number; y: number };
}

const AnimatedBackground = ({ mousePosition }: AnimatedBackgroundProps) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (backgroundRef.current) {
      const { x, y } = mousePosition;
      const rotateX = (y - 0.5) * 15;
      const rotateY = (x - 0.5) * 15;
      
      backgroundRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  }, [mousePosition]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        ref={backgroundRef}
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(ellipse at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(255, 87, 34, 0.4) 0%, 
              rgba(139, 92, 246, 0.3) 20%, 
              rgba(59, 130, 246, 0.3) 40%, 
              rgba(16, 185, 129, 0.2) 60%, 
              rgba(245, 101, 101, 0.3) 80%, 
              rgba(255, 87, 34, 0.2) 100%
            ),
            linear-gradient(135deg, #0a0a0f, #1a1a2e, #16213e, #0a0a0f)
          `,
        }}
      />
      
      {/* Fluid blob shapes inspired by reference image */}
      <div 
        className="absolute w-[800px] h-[600px] opacity-30 blur-3xl animate-pulse"
        style={{
          top: `${20 + mousePosition.y * 20}%`,
          left: `${10 + mousePosition.x * 30}%`,
          background: `radial-gradient(ellipse 70% 80% at 30% 40%, 
            rgba(255, 87, 34, 0.6), 
            rgba(139, 92, 246, 0.4), 
            transparent 70%)`,
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          transform: `rotate(${mousePosition.x * 30}deg) scale(${0.8 + mousePosition.y * 0.4})`,
          transition: 'all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />
      
      <div 
        className="absolute w-[600px] h-[800px] opacity-25 blur-3xl animate-pulse delay-1000"
        style={{
          bottom: `${10 + mousePosition.y * 25}%`,
          right: `${15 + mousePosition.x * 20}%`,
          background: `radial-gradient(ellipse 80% 60% at 60% 70%, 
            rgba(59, 130, 246, 0.5), 
            rgba(16, 185, 129, 0.4), 
            transparent 65%)`,
          borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%',
          transform: `rotate(${-mousePosition.x * 25}deg) scale(${0.9 + mousePosition.x * 0.3})`,
          transition: 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />
      
      <div 
        className="absolute w-[500px] h-[500px] opacity-20 blur-3xl animate-pulse delay-2000"
        style={{
          top: `${50 + mousePosition.y * 15}%`,
          left: `${60 + mousePosition.x * 15}%`,
          background: `radial-gradient(ellipse 90% 70% at 50% 50%, 
            rgba(245, 101, 101, 0.4), 
            rgba(255, 87, 34, 0.3), 
            transparent 60%)`,
          borderRadius: '70% 30% 60% 40% / 30% 60% 40% 70%',
          transform: `rotate(${mousePosition.y * 40}deg) scale(${0.7 + mousePosition.x * 0.5})`,
          transition: 'all 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />
      
      {/* Floating particles */}
      <div 
        className="absolute w-2 h-2 bg-orange-400/40 rounded-full animate-pulse"
        style={{
          top: `${30 + mousePosition.y * 40}%`,
          left: `${20 + mousePosition.x * 60}%`,
          animationDelay: '0s',
        }}
      />
      <div 
        className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
        style={{
          top: `${70 + mousePosition.y * 20}%`,
          left: `${80 + mousePosition.x * 15}%`,
          animationDelay: '1s',
        }}
      />
      <div 
        className="absolute w-3 h-3 bg-purple-400/25 rounded-full animate-pulse"
        style={{
          top: `${10 + mousePosition.y * 30}%`,
          left: `${70 + mousePosition.x * 25}%`,
          animationDelay: '2s',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
