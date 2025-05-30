
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle, Send, X, Phone, Calendar, User, Bot } from 'lucide-react';

interface QAItem {
  question: string;
  answer: string;
  keywords: string[];
  category: string;
}

interface Message {
  type: 'user' | 'bot';
  content: string;
  category?: string;
  showContactOptions?: boolean;
}

const qnaData: QAItem[] = [
  // General Agency Questions
  {
    question: "How long have you been in business?",
    answer: "Over 7+ years scaling e-commerce and SaaS (Software as a Service) brands, generating over $50M in client revenue.",
    keywords: ["experience", "years", "business", "long", "history"],
    category: "General"
  },
  {
    question: "Do you work with my industry?",
    answer: "We specialize in e-commerce, SaaS, and professional services but adapt our frameworks to any niche with clear customer journeys. (Even if your industry isn't listed, we customize strategies based on your audience's behavior.)",
    keywords: ["industry", "work with", "niche", "ecommerce", "saas", "professional services"],
    category: "General"
  },
  {
    question: "What makes you different?",
    answer: "We combine AI-powered predictive analytics with creative storytelling to target high-intent audiences competitors miss. (This means we identify buyers ready to convert, not just broad demographics.)",
    keywords: ["different", "unique", "why choose", "special", "competitive advantage"],
    category: "General"
  },
  {
    question: "Are contracts flexible?",
    answer: "Yes—3/6/12-month options. No lock-ins; cancel anytime with a 30-day notice.",
    keywords: ["contracts", "flexible", "cancel", "lock-in", "terms"],
    category: "General"
  },
  {
    question: "Month-to-month pricing?",
    answer: "Available for ads/CRO (Conversion Rate Optimization), but SEO requires a minimum 3-month commitment to see results.",
    keywords: ["month to month", "monthly", "short term"],
    category: "General"
  },
  {
    question: "Average client ROI?",
    answer: "2.5-4x ROAS (Return on Ad Spend) on paid ads.\n300%+ organic traffic growth within 6-9 months.",
    keywords: ["roi", "results", "roas", "return", "performance"],
    category: "General"
  },
  {
    question: "Do you work with startups?",
    answer: "Yes—we offer startup-friendly packages with milestone-based pricing. (Pay as you grow, not upfront.)",
    keywords: ["startups", "small business", "new business"],
    category: "General"
  },
  {
    question: "How do you measure success?",
    answer: "Revenue-focused metrics only (no vanity KPIs):\nCAC (Customer Acquisition Cost)\nLTV (Lifetime Value)\nProfit-per-campaign",
    keywords: ["measure", "success", "metrics", "kpi", "tracking"],
    category: "General"
  },
  
  // Pricing & Packages
  {
    question: "What's your pricing model?",
    answer: "Flat monthly fee + performance bonuses (aligns our success with yours).",
    keywords: ["pricing", "cost", "price", "model", "fee"],
    category: "Pricing"
  },
  {
    question: "What services do you offer?",
    answer: "Profit-driven growth marketing, including:\nSEO (Search Engine Optimization): Technical, content, and local SEO.\nPerformance ads: Google, Meta (Facebook/Instagram), TikTok.\nCRO (Conversion Rate Optimization).\nMarketing automation. (We focus on scaling revenue, not just traffic.)",
    keywords: ["services", "offer", "what do you do", "marketing", "seo", "ads", "cro"],
    category: "Pricing"
  },
  {
    question: "Hourly or flat-rate?",
    answer: "100% flat-rate—no surprise invoices.",
    keywords: ["hourly", "flat rate", "billing", "invoices"],
    category: "Pricing"
  },
  {
    question: "Starter package details?",
    answer: "$3.5K/month includes:\nSEO + 2 performance campaigns + bi-weekly optimizations.",
    keywords: ["starter", "package", "basic", "entry level"],
    category: "Pricing"
  },
  {
    question: "Long-term contracts?",
    answer: "3-month minimum to implement strategy; 6-12 months recommended for best results.",
    keywords: ["long term", "contract length", "commitment"],
    category: "Pricing"
  },
  {
    question: "Setup fee?",
    answer: "One-time $1,500 for onboarding and tech integration.",
    keywords: ["setup", "onboarding", "initial", "start"],
    category: "Pricing"
  },
  {
    question: "Discounts available?",
    answer: "10% off for 6-month prepaid contracts.",
    keywords: ["discount", "savings", "deal", "promotion"],
    category: "Pricing"
  },
  {
    question: "Custom packages?",
    answer: "Yes—hybrid options (e.g., SEO + CRO only).",
    keywords: ["custom", "tailored", "specific", "hybrid"],
    category: "Pricing"
  },
  {
    question: "Do you charge for strategy calls?",
    answer: "First call is free; paid audits available for deeper analysis.",
    keywords: ["strategy call", "consultation", "free call"],
    category: "Pricing"
  },
  {
    question: "Refund policy?",
    answer: "Pro-rated refunds if KPIs (Key Performance Indicators) aren't met for 2+ consecutive months.",
    keywords: ["refund", "money back", "guarantee"],
    category: "Pricing"
  },
  {
    question: "Payment plans?",
    answer: "Quarterly payments available upon request.",
    keywords: ["payment", "plans", "quarterly", "installments"],
    category: "Pricing"
  },

  // SEO
  {
    question: "How long until SEO works?",
    answer: "3-6 months for traction; 6-12 months for market dominance. (SEO is a long-term strategy, not instant.)",
    keywords: ["seo timeline", "how long", "seo results", "when"],
    category: "SEO"
  },
  {
    question: "What's your SEO strategy?",
    answer: "\"Profit-Centric SEO\"—targeting commercial-intent keywords with high conversion potential.",
    keywords: ["seo strategy", "approach", "methodology"],
    category: "SEO"
  },
  {
    question: "Do you handle technical SEO?",
    answer: "Yes—full audits + fixes (Core Web Vitals, indexing, mobile optimization).",
    keywords: ["technical seo", "site speed", "core web vitals", "mobile"],
    category: "SEO"
  },
  {
    question: "Reporting frequency?",
    answer: "Bi-weekly dashboards with traffic, rankings, and revenue impact.",
    keywords: ["reporting", "dashboard", "frequency", "updates"],
    category: "SEO"
  },
  {
    question: "Do you guarantee rankings?",
    answer: "No (against Google's guidelines), but we guarantee organic traffic growth.",
    keywords: ["guarantee", "ranking", "promise"],
    category: "SEO"
  },
  {
    question: "How do you handle algorithm updates?",
    answer: "Real-time monitoring + contingency plans (e.g., content pivots).",
    keywords: ["algorithm", "updates", "google updates", "changes"],
    category: "SEO"
  },
  {
    question: "Do you build backlinks?",
    answer: "Yes—via digital PR, guest posts, and niche edits (no spammy links).",
    keywords: ["backlinks", "link building", "digital pr"],
    category: "SEO"
  },
  {
    question: "What's your link-building strategy?",
    answer: "Focus on authority sites in your industry for maximum impact.",
    keywords: ["link building", "strategy", "authority"],
    category: "SEO"
  },
  {
    question: "Do you optimize old content?",
    answer: "Yes—we refresh outdated posts to reclaim rankings.",
    keywords: ["old content", "refresh", "optimize existing"],
    category: "SEO"
  },
  {
    question: "Do you offer local SEO?",
    answer: "Yes—geo-targeted strategies, including Google Business Profile optimization.",
    keywords: ["local seo", "google business", "local search"],
    category: "SEO"
  },

  // Paid Ads
  {
    question: "Do you manage Google Ads?",
    answer: "Yes—Search, Shopping, and Performance Max campaigns.",
    keywords: ["google ads", "ppc", "search ads", "shopping"],
    category: "Paid Ads"
  },
  {
    question: "What's your ad management fee?",
    answer: "15-20% of ad spend (minimum $1K/month).",
    keywords: ["ad fee", "management fee", "percentage"],
    category: "Paid Ads"
  },
  {
    question: "How do you optimize ad spend?",
    answer: "AI-driven bidding + manual oversight to cut wasted spend.",
    keywords: ["optimize", "ad spend", "bidding", "waste"],
    category: "Paid Ads"
  },
  {
    question: "Do you run Facebook/Instagram ads?",
    answer: "Yes—creative-first approach with dynamic product ads.",
    keywords: ["facebook ads", "instagram", "meta", "social ads"],
    category: "Paid Ads"
  },
  {
    question: "What's your average ROAS?",
    answer: "3.8x for e-commerce; 5x+ for SaaS lead gen.",
    keywords: ["roas", "return on ad spend", "ad performance"],
    category: "Paid Ads"
  },
  {
    question: "How quickly do ads deliver results?",
    answer: "30-45 days for optimized campaigns. (Testing phase included.)",
    keywords: ["ad results", "how fast", "timeline"],
    category: "Paid Ads"
  },
  {
    question: "Do you run LinkedIn Ads for B2B?",
    answer: "Yes—ABM (Account-Based Marketing) for high-ticket clients.",
    keywords: ["linkedin ads", "b2b", "account based marketing"],
    category: "Paid Ads"
  },
  {
    question: "Do you manage TikTok ads?",
    answer: "Yes—viral-first creative testing for Gen Z audiences.",
    keywords: ["tiktok ads", "gen z", "viral", "creative"],
    category: "Paid Ads"
  },
  {
    question: "How do you target audiences?",
    answer: "Predictive audiences—we target lookalikes of your most profitable buyers.",
    keywords: ["targeting", "audiences", "lookalikes", "buyers"],
    category: "Paid Ads"
  },
  {
    question: "Do you do remarketing?",
    answer: "Yes—cross-channel retargeting (ads + email + SMS).",
    keywords: ["remarketing", "retargeting", "cross channel"],
    category: "Paid Ads"
  }
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Hi! I\'m your AI assistant. Ask me anything about our services, pricing, SEO, or paid ads. I can also help you get in touch with our team!'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestMatch = (userInput: string): QAItem | null => {
    const input = userInput.toLowerCase();
    
    // First, try to find exact keyword matches
    const matches = qnaData.filter(item => 
      item.keywords.some(keyword => input.includes(keyword.toLowerCase()))
    );

    if (matches.length > 0) {
      // Return the match with the most keyword matches
      return matches.reduce((best, current) => {
        const bestMatches = best.keywords.filter(k => input.includes(k.toLowerCase())).length;
        const currentMatches = current.keywords.filter(k => input.includes(k.toLowerCase())).length;
        return currentMatches > bestMatches ? current : best;
      });
    }

    return null;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { type: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);

    // Find best matching Q&A
    const match = findBestMatch(inputValue);
    
    let botResponse: Message;
    if (match) {
      botResponse = {
        type: 'bot',
        content: match.answer,
        category: match.category
      };
    } else {
      botResponse = {
        type: 'bot',
        content: "I don't have a specific answer for that question. Would you like to contact our team directly for personalized assistance?",
        showContactOptions: true
      };
    }

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInputValue('');
    setShowOptions(false);
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = { type: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);

    const match = qnaData.find(item => item.question === question);
    if (match) {
      const botResponse: Message = {
        type: 'bot',
        content: match.answer,
        category: match.category
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, botResponse]);
      }, 500);
    }
    
    setShowOptions(false);
  };

  const handleContactOption = (type: string) => {
    let response = '';
    switch (type) {
      case 'contact':
        response = 'Great! You can reach us at hello@evergrowthlabs.com or call +1 (555) 123-4567. We typically respond within 24 hours.';
        break;
      case 'session':
        response = 'Perfect! I\'d love to schedule a call session with you. Please email us at hello@evergrowthlabs.com with your preferred times, and we\'ll set up a 30-minute consultation.';
        break;
      default:
        response = 'How can I help you get in touch with our team?';
    }

    setMessages(prev => [...prev, {
      type: 'bot',
      content: response
    }]);
  };

  const quickQuestions = [
    "What services do you offer?",
    "What's your pricing model?",
    "How long until SEO works?",
    "Average client ROI?"
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
            size="icon"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md h-[600px] flex flex-col p-0 bg-slate-900 border-slate-700">
          <DialogHeader className="p-4 border-b border-slate-700">
            <DialogTitle className="text-white flex items-center gap-2">
              <Bot className="h-5 w-5 text-orange-400" />
              AI Assistant
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-slate-800 text-white border border-slate-700'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  {message.category && (
                    <span className="text-xs text-orange-300 mt-1 block">
                      {message.category}
                    </span>
                  )}
                  {message.showContactOptions && (
                    <div className="mt-3 space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                        onClick={() => handleContactOption('contact')}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Us
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                        onClick={() => handleContactOption('session')}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Call Session
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {showOptions && messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-slate-400 text-sm">Try asking:</p>
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-slate-800 border-slate-700 text-white hover:bg-slate-700 text-left"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
                <div className="mt-4 space-y-2">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    onClick={() => handleContactOption('contact')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Us Directly
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                    onClick={() => handleContactOption('session')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Schedule Call Session
                  </Button>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 focus:border-orange-400"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIChatbot;
