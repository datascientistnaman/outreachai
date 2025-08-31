import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Search, Cog, Brain, Mail, CheckCircle } from "lucide-react";

interface LoadingStep {
  icon: React.ReactNode;
  text: string;
  delay: number;
}

const loadingSteps: LoadingStep[] = [
  { icon: <Search className="w-4 h-4" />, text: 'Fetching leads from Apollo...', delay: 1000 },
  { icon: <Cog className="w-4 h-4" />, text: 'Processing lead data...', delay: 2000 },
  { icon: <Brain className="w-4 h-4" />, text: 'Generating personalized emails with AI...', delay: 4000 },
  { icon: <Mail className="w-4 h-4" />, text: 'Sending emails to clients...', delay: 6000 },
  { icon: <CheckCircle className="w-4 h-4" />, text: 'Finalizing outreach campaign...', delay: 8000 }
];

export default function LoadingMessages() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    loadingSteps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setVisibleSteps(prev => [...prev, index]);
      }, step.delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <div className="space-y-4" data-testid="loading-messages">
      <AnimatePresence>
        {visibleSteps.map((stepIndex) => (
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="glass-card p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="text-primary">
                    {loadingSteps[stepIndex].icon}
                  </div>
                </div>
                <span className="text-muted-foreground">{loadingSteps[stepIndex].text}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
