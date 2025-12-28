import { useGetStandings } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

export default function LeagueTable() {
  const { data: standings, isLoading } = useGetStandings();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading standings...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          League Standings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-center">P</TableHead>
                <TableHead className="text-center">W</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead className="text-center">GF</TableHead>
                <TableHead className="text-center">GA</TableHead>
                <TableHead className="text-center">GD</TableHead>
                <TableHead className="text-center font-bold">Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings?.map((team, index) => (
                <TableRow key={team.teamId} className={index < 4 ? 'bg-primary/5' : ''}>
                  <TableCell className="font-medium">
                    {index < 3 ? (
                      <Badge variant={index === 0 ? 'default' : 'secondary'} className="w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">{index + 1}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={team.emblem}
                        alt={team.teamName}
                        className="h-8 w-8 object-contain"
                      />
                      <span className="font-semibold">{team.teamName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{team.played}</TableCell>
                  <TableCell className="text-center text-green-600 dark:text-green-400">{team.wins}</TableCell>
                  <TableCell className="text-center text-yellow-600 dark:text-yellow-400">{team.draws}</TableCell>
                  <TableCell className="text-center text-red-600 dark:text-red-400">{team.losses}</TableCell>
                  <TableCell className="text-center">{team.goalsFor}</TableCell>
                  <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                  <TableCell className="text-center font-medium">
                    {team.goalsFor - team.goalsAgainst > 0 ? '+' : ''}
                    {team.goalsFor - team.goalsAgainst}
                  </TableCell>
                  <TableCell className="text-center font-bold text-primary">{team.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
