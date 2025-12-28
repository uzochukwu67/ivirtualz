import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile } from '../backend';
import { toast } from 'sonner';

// Type definitions for mock data
interface Team {
  id: number;
  name: string;
  emblem: string;
  color: string;
}

interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  homeGoals: number | null;
  awayGoals: number | null;
  finished: boolean;
  odds?: {
    homeWin: string;
    draw: string;
    awayWin: string;
  };
  roundNumber?: number;
}

interface Standing {
  teamId: number;
  teamName: string;
  emblem: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

interface UserBet {
  betId: number;
  stake: number;
  potentialWinnings: number;
  status: string;
  betType: string;
  predictions: number;
  roundNumber: number;
}

interface UserStats {
  totalBets: number;
  wonBets: number;
  lostBets: number;
  totalWinnings: number;
  winRate: number;
  balance: number;
}

interface CurrentRound {
  roundNumber: number;
  season: number;
  startTime: number;
  timeRemaining: number;
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Profile saved successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save profile: ${error.message}`);
    },
  });
}

// Mock data hooks for demonstration (since backend functions are not implemented)
export function useGetTeams() {
  return useQuery<Team[]>({
    queryKey: ['teams'],
    queryFn: async () => {
      // Mock 20 teams
      return Array.from({ length: 20 }, (_, i) => ({
        id: i,
        name: [
          'Canista', 'Motoko Bulls', 'Cycle City', 'Smart Contracts', 'ICP Lions',
          'Backend Bears', 'Cog Development', 'Virtual Wolves', 'Fractal Borough', 'Neuron Express',
          'Actors United', 'Orbit Coders', 'Stable Rocket', 'Cycle Club', 'Transaction Tigers',
          'MoTheGang', 'Canon City', 'CRUD United', 'Meta Knights', 'IVirtualz'
        ][i],
        emblem: `/assets/generated/team-logo-${(i % 15) + 1}-transparent.dim_200x200.png`,
        color: ['#aa00ff', '#ff2d55', '#49ebf3', '#9f8fff', '#ffb74d', '#ad1457', '#d1bdf2', '#2b1257', '#ffea00', '#3949ab', '#ea80fc', '#ff5252', '#00e676', '#ab00ff', '#fbc02d', '#c3fdff', '#bdbdbd', '#f50057', '#9e9d24', '#302b63'][i],
      }));
    },
  });
}

export function useGetStandings() {
  const { data: teams } = useGetTeams();
  
  return useQuery<Standing[]>({
    queryKey: ['standings'],
    queryFn: async () => {
      if (!teams) return [];
      // Mock standings data
      return teams.map((team, i) => ({
        teamId: team.id,
        teamName: team.name,
        emblem: team.emblem,
        played: Math.floor(Math.random() * 10) + 5,
        wins: Math.floor(Math.random() * 8),
        draws: Math.floor(Math.random() * 4),
        losses: Math.floor(Math.random() * 5),
        goalsFor: Math.floor(Math.random() * 20) + 10,
        goalsAgainst: Math.floor(Math.random() * 15) + 5,
        points: Math.floor(Math.random() * 25) + 10,
      })).sort((a, b) => b.points - a.points);
    },
    enabled: !!teams,
  });
}

export function useGetCurrentRound() {
  return useQuery<CurrentRound>({
    queryKey: ['currentRound'],
    queryFn: async () => {
      // Mock current round
      return {
        roundNumber: 12,
        season: 1,
        startTime: Date.now() * 1000000,
        timeRemaining: 8 * 60 * 1000, // 8 minutes remaining
      };
    },
  });
}

export function useGetFixtures() {
  const { data: teams } = useGetTeams();
  
  return useQuery<Match[]>({
    queryKey: ['fixtures'],
    queryFn: async () => {
      if (!teams) return [];
      // Mock 10 matches
      const matches: Match[] = [];
      for (let i = 0; i < 10; i++) {
        const homeIdx = i * 2;
        const awayIdx = i * 2 + 1;
        matches.push({
          id: i,
          homeTeam: teams[homeIdx],
          awayTeam: teams[awayIdx],
          homeGoals: null,
          awayGoals: null,
          finished: false,
          odds: {
            homeWin: (Math.random() * 2 + 1.5).toFixed(2),
            draw: (Math.random() * 1.5 + 3).toFixed(2),
            awayWin: (Math.random() * 2 + 1.5).toFixed(2),
          },
        });
      }
      return matches;
    },
    enabled: !!teams,
  });
}

export function useGetMatchHistory() {
  const { data: teams } = useGetTeams();
  
  return useQuery<Match[]>({
    queryKey: ['matchHistory'],
    queryFn: async () => {
      if (!teams) return [];
      // Mock recent matches
      const matches: Match[] = [];
      for (let i = 0; i < 10; i++) {
        const homeIdx = Math.floor(Math.random() * 20);
        let awayIdx = Math.floor(Math.random() * 20);
        while (awayIdx === homeIdx) awayIdx = Math.floor(Math.random() * 20);
        
        matches.push({
          id: 100 + i,
          homeTeam: teams[homeIdx],
          awayTeam: teams[awayIdx],
          homeGoals: Math.floor(Math.random() * 4),
          awayGoals: Math.floor(Math.random() * 4),
          finished: true,
          roundNumber: 11,
        });
      }
      return matches;
    },
    enabled: !!teams,
  });
}

export function useGetUserBets() {
  return useQuery<UserBet[]>({
    queryKey: ['userBets'],
    queryFn: async () => {
      // Mock user bets
      return [
        {
          betId: 1,
          stake: 100,
          potentialWinnings: 250,
          status: 'active',
          betType: 'multi',
          predictions: 3,
          roundNumber: 12,
        },
        {
          betId: 2,
          stake: 50,
          potentialWinnings: 125,
          status: 'won',
          betType: 'single',
          predictions: 1,
          roundNumber: 11,
        },
      ];
    },
  });
}

export function useGetUserStats() {
  return useQuery<UserStats>({
    queryKey: ['userStats'],
    queryFn: async () => {
      return {
        totalBets: 45,
        wonBets: 28,
        lostBets: 17,
        totalWinnings: 2450.50,
        winRate: 62.2,
        balance: 5000,
      };
    },
  });
}
