import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LiveMatches from '../components/LiveMatches';
import LeagueTable from '../components/LeagueTable';
import MyBets from '../components/MyBets';
import MatchHistory from '../components/MatchHistory';
import UserStatsCard from '../components/UserStatsCard';
import RoundTimer from '../components/RoundTimer';

export default function Dashboard() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <RoundTimer />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2">
          <UserStatsCard />
        </div>
      </div>

      <Tabs defaultValue="matches" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="matches">Live Matches</TabsTrigger>
          <TabsTrigger value="table">League Table</TabsTrigger>
          <TabsTrigger value="mybets">My Bets</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-6">
          <LiveMatches />
        </TabsContent>

        <TabsContent value="table" className="space-y-6">
          <LeagueTable />
        </TabsContent>

        <TabsContent value="mybets" className="space-y-6">
          <MyBets />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <MatchHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
