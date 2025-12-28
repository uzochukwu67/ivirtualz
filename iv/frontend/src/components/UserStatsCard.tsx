import { useGetUserStats } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Coins, Award } from 'lucide-react';

export default function UserStatsCard() {
  const { data: stats } = useGetUserStats();

  if (!stats) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Your Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Coins className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="text-xl font-bold">{stats.balance.toFixed(0)} ICP</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <Target className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Bets</p>
              <p className="text-xl font-bold">{stats.totalBets}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-xl font-bold">{stats.winRate.toFixed(1)}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-muted p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Winnings</p>
              <p className="text-xl font-bold">{stats.totalWinnings.toFixed(0)} ICP</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
