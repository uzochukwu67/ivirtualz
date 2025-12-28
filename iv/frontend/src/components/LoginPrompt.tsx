import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Shield, Coins, TrendingUp } from 'lucide-react';

export default function LoginPrompt() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
            <Trophy className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Welcome to IVirtualz
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            The Premier Virtual Football Betting League on the Internet Computer
          </p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            size="lg"
            className="text-lg px-8 py-6"
          >
            {isLoggingIn ? 'Connecting...' : 'Login with Internet Identity'}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card className="border-primary/20">
            <CardHeader>
              <Trophy className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">20 Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Compete in a full virtual league with 20 unique teams
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-accent mb-2" />
              <CardTitle className="text-lg">Live Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                New rounds every 15 minutes with 10 matches each
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <Coins className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Free to Play</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Simulated ICP tokens - no real money required
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader>
              <Shield className="h-8 w-8 text-accent mb-2" />
              <CardTitle className="text-lg">On-Chain</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Fully transparent and verifiable on the blockchain
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Login & Get Started</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with Internet Identity to access your account
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Place Your Bets</h3>
                <p className="text-sm text-muted-foreground">
                  Predict match outcomes with single or multi-bets for higher multipliers
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Watch & Win</h3>
                <p className="text-sm text-muted-foreground">
                  Follow live matches and collect your winnings automatically
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
