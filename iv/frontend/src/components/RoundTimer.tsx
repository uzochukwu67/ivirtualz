import { useEffect, useState } from 'react';
import { useGetCurrentRound } from '../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Calendar } from 'lucide-react';

export default function RoundTimer() {
  const { data: currentRound } = useGetCurrentRound();
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (currentRound?.timeRemaining) {
      setTimeRemaining(currentRound.timeRemaining);
      
      const interval = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentRound]);

  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Round</p>
              <p className="text-2xl font-bold">
                Round {currentRound?.roundNumber || 0} - Season {currentRound?.season || 1}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground">Next Round In</p>
              <p className="text-2xl font-bold font-mono">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
