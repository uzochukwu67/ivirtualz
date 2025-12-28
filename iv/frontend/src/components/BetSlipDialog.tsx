import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface BetSlipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  betSlip: any[];
  onClear: () => void;
}

export default function BetSlipDialog({ open, onOpenChange, betSlip, onClear }: BetSlipDialogProps) {
  const [stake, setStake] = useState('100');

  const getOutcomeLabel = (outcome: string) => {
    switch (outcome) {
      case 'home': return 'Home Win';
      case 'draw': return 'Draw';
      case 'away': return 'Away Win';
      default: return outcome;
    }
  };

  const getOdds = (match: any, outcome: string) => {
    switch (outcome) {
      case 'home': return parseFloat(match.odds.homeWin);
      case 'draw': return parseFloat(match.odds.draw);
      case 'away': return parseFloat(match.odds.awayWin);
      default: return 1;
    }
  };

  const totalOdds = betSlip.reduce((acc, bet) => acc * getOdds(bet.match, bet.outcome), 1);
  const potentialWinnings = parseFloat(stake || '0') * totalOdds;
  const multiplier = betSlip.length > 1 ? 1 + (betSlip.length - 1) * 0.1 : 1;
  const finalWinnings = potentialWinnings * multiplier;

  const handlePlaceBet = () => {
    toast.success('Bet placed successfully!', {
      description: `Stake: ${stake} ICP | Potential: ${finalWinnings.toFixed(2)} ICP`,
    });
    onClear();
    onOpenChange(false);
    setStake('100');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Bet Slip</span>
            <Badge variant="secondary">{betSlip.length} {betSlip.length === 1 ? 'Selection' : 'Selections'}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {betSlip.map((bet, index) => (
            <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">
                  {bet.match.homeTeam.name} vs {bet.match.awayTeam.name}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {getOutcomeLabel(bet.outcome)}
                  </Badge>
                  <span className="text-sm font-bold text-primary">
                    {getOdds(bet.match, bet.outcome).toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  const newSlip = betSlip.filter((_, i) => i !== index);
                  if (newSlip.length === 0) {
                    onOpenChange(false);
                  }
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="space-y-3 rounded-lg bg-muted p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Odds:</span>
              <span className="font-bold">{totalOdds.toFixed(2)}</span>
            </div>
            {betSlip.length > 1 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Multi-bet Bonus:</span>
                <span className="font-bold text-accent">+{((multiplier - 1) * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stake">Stake Amount (ICP)</Label>
            <Input
              id="stake"
              type="number"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              placeholder="Enter stake"
              min="1"
            />
          </div>

          <div className="rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-semibold">Potential Winnings</span>
              </div>
              <span className="text-2xl font-bold text-primary">
                {finalWinnings.toFixed(2)} ICP
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => { onClear(); onOpenChange(false); }}>
            Clear All
          </Button>
          <Button onClick={handlePlaceBet} disabled={!stake || parseFloat(stake) <= 0}>
            Place Bet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
