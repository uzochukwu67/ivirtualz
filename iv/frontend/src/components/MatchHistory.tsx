import { useGetMatchHistory } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History } from 'lucide-react';

export default function MatchHistory() {
  const { data: matches, isLoading } = useGetMatchHistory();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading match history...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Recent Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {matches?.map((match) => (
            <div
              key={match.id}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={match.homeTeam.emblem}
                  alt={match.homeTeam.name}
                  className="h-10 w-10 object-contain"
                />
                <div className="flex-1">
                  <p className="font-semibold">{match.homeTeam.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-6">
                <Badge variant="outline" className="text-lg font-bold px-4 py-2">
                  {match.homeGoals} - {match.awayGoals}
                </Badge>
              </div>

              <div className="flex items-center gap-3 flex-1 justify-end">
                <div className="flex-1 text-right">
                  <p className="font-semibold">{match.awayTeam.name}</p>
                </div>
                <img
                  src={match.awayTeam.emblem}
                  alt={match.awayTeam.name}
                  className="h-10 w-10 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
