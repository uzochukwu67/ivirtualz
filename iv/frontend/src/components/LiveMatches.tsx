import { useState } from 'react';
import { useGetFixtures } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Plus } from 'lucide-react';
import BetSlipDialog from './BetSlipDialog';
import { toast } from 'sonner';

interface BetSlipItem {
  matchId: number;
  match: any;
  outcome: 'home' | 'draw' | 'away';
}

export default function LiveMatches() {
  const { data: fixtures, isLoading } = useGetFixtures();
  const [betSlip, setBetSlip] = useState<BetSlipItem[]>([]);
  const [showBetSlip, setShowBetSlip] = useState(false);

  const addToBetSlip = (match: any, outcome: 'home' | 'draw' | 'away') => {
    const existing = betSlip.find((b) => b.matchId === match.id);
    if (existing) {
      setBetSlip(betSlip.filter((b) => b.matchId !== match.id));
      toast.info('Removed from bet slip');
    } else {
      setBetSlip([...betSlip, { matchId: match.id, match, outcome }]);
      toast.success('Added to bet slip');
    }
  };

  const isInBetSlip = (matchId: number, outcome: string) => {
    return betSlip.some((b) => b.matchId === matchId && b.outcome === outcome);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading matches...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          Current Round Fixtures
        </h2>
        {betSlip.length > 0 && (
          <Button onClick={() => setShowBetSlip(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Bet Slip ({betSlip.length})
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {fixtures?.map((match) => (
          <Card key={match.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 p-6">
                {/* Home Team */}
                <div className="flex items-center justify-end gap-3">
                  <div className="text-right">
                    <p className="font-semibold text-lg">{match.homeTeam.name}</p>
                  </div>
                  <img
                    src={match.homeTeam.emblem}
                    alt={match.homeTeam.name}
                    className="h-12 w-12 object-contain"
                  />
                </div>

                {/* VS */}
                <div className="flex items-center justify-center">
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    VS
                  </Badge>
                </div>

                {/* Away Team */}
                <div className="flex items-center gap-3">
                  <img
                    src={match.awayTeam.emblem}
                    alt={match.awayTeam.name}
                    className="h-12 w-12 object-contain"
                  />
                  <div>
                    <p className="font-semibold text-lg">{match.awayTeam.name}</p>
                  </div>
                </div>
              </div>

              {/* Betting Options */}
              {match.odds && (
                <div className="grid grid-cols-3 gap-2 p-4 bg-muted/50 border-t">
                  <Button
                    variant={isInBetSlip(match.id, 'home') ? 'default' : 'outline'}
                    className="flex flex-col h-auto py-3"
                    onClick={() => addToBetSlip(match, 'home')}
                  >
                    <span className="text-xs text-muted-foreground mb-1">Home Win</span>
                    <span className="text-lg font-bold">{match.odds.homeWin}</span>
                  </Button>
                  <Button
                    variant={isInBetSlip(match.id, 'draw') ? 'default' : 'outline'}
                    className="flex flex-col h-auto py-3"
                    onClick={() => addToBetSlip(match, 'draw')}
                  >
                    <span className="text-xs text-muted-foreground mb-1">Draw</span>
                    <span className="text-lg font-bold">{match.odds.draw}</span>
                  </Button>
                  <Button
                    variant={isInBetSlip(match.id, 'away') ? 'default' : 'outline'}
                    className="flex flex-col h-auto py-3"
                    onClick={() => addToBetSlip(match, 'away')}
                  >
                    <span className="text-xs text-muted-foreground mb-1">Away Win</span>
                    <span className="text-lg font-bold">{match.odds.awayWin}</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <BetSlipDialog
        open={showBetSlip}
        onOpenChange={setShowBetSlip}
        betSlip={betSlip}
        onClear={() => setBetSlip([])}
      />
    </>
  );
}
