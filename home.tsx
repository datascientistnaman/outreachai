import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LoadingMessages from "@/components/loading-messages";
import SuccessMetrics from "@/components/success-metrics";
import { 
  Brain, 
  Search, 
  Rocket, 
  Play, 
  Check, 
  RotateCcw, 
  BarChart3,
  Bot
} from "lucide-react";

type AppState = 'initial' | 'loading' | 'success';

interface OutreachResult {
  clientsReached: number;
  executionTime: number;
  emailsSent: number;
  successRate: number;
  avgPersonalization: number;
}

export default function Home() {
  const [currentState, setCurrentState] = useState<AppState>('initial');
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [result, setResult] = useState<OutreachResult | null>(null);
  const { toast } = useToast();

  const outreachMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/outreach/trigger');
      return response.json() as Promise<OutreachResult>;
    },
    onSuccess: (data) => {
      setResult(data);
      setCurrentState('success');
    },
    onError: (error) => {
      console.error('Outreach failed:', error);
      toast({
        title: "Outreach Failed",
        description: "Failed to trigger outreach workflow. Please try again.",
        variant: "destructive",
      });
      setCurrentState('initial');
    }
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (currentState === 'loading') {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentState, startTime]);

  const handleStartOutreach = () => {
    setStartTime(Date.now());
    setElapsedTime(0);
    setCurrentState('loading');
    outreachMutation.mutate();
  };

  const handleRunAgain = () => {
    setCurrentState('initial');
    setResult(null);
    setElapsedTime(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-blue-950/10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />
      
      {/* Main Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {currentState === 'initial' && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center space-y-12"
            >
              {/* Header Section */}
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary"
                >
                  <Bot className="w-4 h-4" />
                  <span>AI-Powered Outreach Agent</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-bold tracking-tight"
                >
                  <span className="gradient-text">Premium</span><br />
                  <span className="text-foreground">Client Outreach</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                >
                  Automatically fetch leads from Apollo, generate personalized emails with AI, and reach multiple clients instantly with our premium outreach platform.
                </motion.p>
              </div>

              {/* Feature Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
              >
                <Card className="glass-card p-6 space-y-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                    <Search className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg">Lead Discovery</h3>
                  <p className="text-muted-foreground text-sm">Automatically fetch qualified leads from Apollo using advanced filters</p>
                </Card>
                
                <Card className="glass-card p-6 space-y-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                    <Brain className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg">AI Personalization</h3>
                  <p className="text-muted-foreground text-sm">GPT generates highly personalized emails based on business context</p>
                </Card>
                
                <Card className="glass-card p-6 space-y-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
                    <Rocket className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg">Instant Delivery</h3>
                  <p className="text-muted-foreground text-sm">Send personalized emails to multiple clients in seconds</p>
                </Card>
              </motion.div>

              {/* Main CTA Button */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-8"
              >
                <Button 
                  onClick={handleStartOutreach}
                  disabled={outreachMutation.isPending}
                  className="group relative px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xl rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 pulse-glow"
                  data-testid="button-start-outreach"
                >
                  <span className="flex items-center space-x-3">
                    <Play className="w-6 h-6 group-hover:animate-bounce" />
                    <span>Start Outreaching to Clients</span>
                  </span>
                </Button>
                
                <p className="text-muted-foreground text-sm">
                  Click to activate your AI outreach workflow
                </p>
              </motion.div>
            </motion.div>
          )}

          {currentState === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center space-y-12"
            >
              {/* Loading Animation */}
              <div className="relative">
                <div className="w-32 h-32 mx-auto">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full spin-slow" />
                  <div className="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="text-primary w-12 h-12" />
                  </div>
                </div>
              </div>

              {/* Loading Messages */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="gradient-text">AI Agent Working</span>
                </h2>
                
                <LoadingMessages />
              </div>

              {/* Timer Display */}
              <Card className="glass-card p-6 max-w-xs mx-auto">
                <div className="text-2xl font-bold text-primary" data-testid="text-timer">
                  {elapsedTime}s
                </div>
                <div className="text-muted-foreground text-sm">Processing time</div>
              </Card>
            </motion.div>
          )}

          {currentState === 'success' && result && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center space-y-12"
            >
              {/* Success Animation */}
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="w-24 h-24 mx-auto bg-green-500 rounded-full flex items-center justify-center count-up"
                >
                  <Check className="text-white w-12 h-12" />
                </motion.div>
                <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-green-500/30 animate-ping" />
              </div>

              {/* Success Message */}
              <div className="space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl font-bold"
                >
                  <span className="text-green-400">Mission Complete!</span>
                </motion.h2>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-card p-8 rounded-xl max-w-2xl mx-auto"
                >
                  <div className="text-3xl md:text-4xl font-bold mb-4">
                    You just reached <span className="gradient-text" data-testid="text-clients-reached">{result.clientsReached}</span> clients
                  </div>
                  <div className="text-xl text-muted-foreground">
                    in just <span className="text-primary font-semibold" data-testid="text-execution-time">{result.executionTime}</span> seconds
                  </div>
                </motion.div>
              </div>

              {/* Metrics Grid */}
              <SuccessMetrics result={result} />

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  onClick={handleRunAgain}
                  className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:scale-105"
                  data-testid="button-run-again"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Run Another Campaign
                </Button>
                
                <Button 
                  variant="secondary"
                  className="px-8 py-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold transition-all duration-300"
                  data-testid="button-view-analytics"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
