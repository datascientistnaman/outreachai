import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface OutreachResult {
  clientsReached: number;
  executionTime: number;
  emailsSent: number;
  successRate: number;
  avgPersonalization: number;
}

interface SuccessMetricsProps {
  result: OutreachResult;
}

export default function SuccessMetrics({ result }: SuccessMetricsProps) {
  const metrics = [
    {
      value: result.emailsSent,
      label: "Emails Sent",
      color: "text-primary",
      testId: "metric-emails-sent"
    },
    {
      value: `${result.successRate}%`,
      label: "Success Rate",
      color: "text-green-400",
      testId: "metric-success-rate"
    },
    {
      value: `${result.avgPersonalization}%`,
      label: "Personalization",
      color: "text-blue-400",
      testId: "metric-personalization"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
      data-testid="success-metrics"
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + (index * 0.1), type: "spring" }}
        >
          <Card className="glass-card p-6 space-y-3 slide-up">
            <div className={`text-3xl font-bold ${metric.color}`} data-testid={metric.testId}>
              {metric.value}
            </div>
            <div className="text-muted-foreground">{metric.label}</div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
