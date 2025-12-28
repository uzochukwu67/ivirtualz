import { useGetUserBets } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, Clock } from 'lucide-react';

export default function MyBets() {
  const { data: bets, isLoading } = useGetUserBets();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your bets...</p>
        </CardContent>
      </Card>
    );
  }

  if (!bets || bets.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-semibold mb-2">No Bets Yet</p>
          <p className="text-muted-foreground">
            Start betting on matches to see your bets here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Target className="h-6 w-6 text-primary" />
        My Bets
      </h2>

      <div className="grid gap-4">
        {bets.map((bet) => (
          <Card key={bet.betId}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Bet #{bet.betId} - Round {bet.roundNumber}
                </CardTitle>
                <Badge
                  variant={
                    bet.status === 'won'
                      ? 'default'
                      : bet.status === 'lost'
                      ? 'destructive'
                      : 'secondary'
                  }
                >
                  {bet.status === 'active' && <Clock className="h-3 w-3 mr-1" />}
                  {bet.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Type</p>
                  <p className="font-semibold capitalize">{bet.betType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Predictions</p>
                  <p className="font-semibold">{bet.predictions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Stake</p>
                  <p className="font-semibold">{bet.stake} ICP</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {bet.status === 'won' ? 'Winnings' : 'Potential'}
                  </p>
                  <p className="font-semibold text-primary flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {bet.potentialWinnings.toFixed(2)} ICP
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
