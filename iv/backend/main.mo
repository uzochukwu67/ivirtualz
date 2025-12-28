import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import List "mo:core/List";
import Timer "mo:core/Timer";
import Float "mo:core/Float";
import Order "mo:core/Order";
import Set "mo:core/Set";
import Int "mo:core/Int";
import Random "mo:core/Random";
import AccessControl "authorization/access-control";

actor {
  module TeamId {
    public func compare(teamId1 : TeamId, teamId2 : TeamId) : Order.Order {
      Nat.compare(teamId1, teamId2);
    };
  };
  type TeamId = Nat;
  type SeasonId = Nat;
  type MatchId = Nat;
  type RoundNumber = Nat;
  type RoundStartTime = Int;
  type GameRoundDuration = Nat;
  type WinningTeam = ?TeamId;
  type TokenAmount = Float;

  type UpcomingRound = {
    roundNumber : RoundNumber;
    startTime : RoundStartTime;
    season : SeasonId;
    matches : ?[Match];
  };

  type BetId = Nat;

  type BetStatus = {
    #active;
    #won;
    #lost;
    #finalOdds : Odds;
  };

  type Odds = Float;

  type BetType = {
    #single;
    #multi;
  };

  type UserBet = {
    betId : BetId;
    user : Principal;
    bets : [MatchBet];
    stake : Float;
    potentialWinnings : Float;
    status : BetStatus;
    betType : BetType;
    betTime : Int;
    roundNumber : RoundNumber;
    season : SeasonId;
  };

  type MatchBet = {
    matchId : MatchId;
    predictedOutcome : MatchOutcome;
    odds : Float;
  };

  type UserStats = {
    totalWinnings : Float;
    totalBets : Nat;
    winningPercentage : Float;
  };

  type SeasonStats = {
    totalWinners : Float;
    totalBetsPlaced : Nat;
    seasonId : Nat;
  };

  type TeamStats = {
    teamId : TeamId;
    played : Nat;
    wins : Nat;
    draws : Nat;
    losses : Nat;
    points : Nat;
    goalsFor : Nat;
    goalsAgainst : Nat;
    matches : Set.Set<MatchId>;
    lastFiveResults : [MatchOutcome];
  };

  module Match {
    public func compare(match1 : Match, match2 : Match) : Order.Order {
      Nat.compare(match1.id, match2.id);
    };
  };

  type Match = {
    id : MatchId;
    homeTeamId : TeamId;
    awayTeamId : TeamId;
    homeGoals : Nat;
    awayGoals : Nat;
    finished : Bool;
    season : SeasonId;
    roundNumber : RoundNumber;
    winner : ?TeamId;
    odds : Odds;
  };

  module TeamInfo {
    public func compare(teamInfo1 : TeamInfo, teamInfo2 : TeamInfo) : Order.Order {
      Int.compare(teamInfo1.id - teamInfo2.id, 0);
    };
  };

  type TeamInfo = {
    id : TeamId;
    name : Text;
    emblem : Text;
    color : Text;
    winPayout : Float;
    drawPayout : Float;
    losePayout : Float;
  };

  type Fixture = {
    roundNumber : RoundNumber;
    matches : [MatchId];
    season : SeasonId;
    startTime : Int;
  };

  type VirtualLeagueRound = {
    season : SeasonId;
    round : RoundNumber;
    startTime : Int;
    matches : [MatchId];
  };

  type MatchOutcome = {
    #homeWin;
    #draw;
    #awayWin;
  };

  let gameRoundDuration : GameRoundDuration = 15 * 60 * 1000000000;
  let maxRoundsPerSeason = 36;
  var currentSeason = 1;

  type CalculationRound = Nat;

  let allTeams = List.fromArray<TeamInfo>([
    {
      id = 0;
      name = "Canista";
      emblem = "canista";
      color = "#aa00ff";
      winPayout = 2.0;
      drawPayout = 3.5;
      losePayout = 1.5;
    },
    {
      id = 1;
      name = "Motoko Bulls";
      emblem = "motoko";
      color = "#ff2d55";
      winPayout = 3.2;
      drawPayout = 3.8;
      losePayout = 1.4;
    },
    {
      id = 2;
      name = "Cycle City";
      emblem = "cycle";
      color = "#49ebf3";
      winPayout = 1.7;
      drawPayout = 4.2;
      losePayout = 2.2;
    },
    {
      id = 3;
      name = "Smart Contracts";
      emblem = "cycles";
      color = "#9f8fff";
      winPayout = 2.3;
      drawPayout = 3.1;
      losePayout = 1.7;
    },
    {
      id = 4;
      name = "ICP Lions";
      emblem = "lions";
      color = "#ffb74d";
      winPayout = 2.5;
      drawPayout = 2.9;
      losePayout = 1.6;
    },
    {
      id = 5;
      name = "Backend Bears";
      emblem = "backend";
      color = "#ad1457";
      winPayout = 2.8;
      drawPayout = 3.3;
      losePayout = 1.5;
    },
    {
      id = 6;
      name = "Cog Development";
      emblem = "cog";
      color = "#d1bdf2";
      winPayout = 2.1;
      drawPayout = 4.0;
      losePayout = 1.7;
    },
    {
      id = 7;
      name = "Virtual Wolves";
      emblem = "wolves";
      color = "#2b1257";
      winPayout = 1.9;
      drawPayout = 3.7;
      losePayout = 2.0;
    },
    {
      id = 8;
      name = "Fractal Borough";
      emblem = "fractal";
      color = "#ffea00";
      winPayout = 2.6;
      drawPayout = 2.8;
      losePayout = 1.5;
    },
    {
      id = 9;
      name = "Neuron Express";
      emblem = "neuron";
      color = "#3949ab";
      winPayout = 2.2;
      drawPayout = 4.1;
      losePayout = 1.8;
    },
    {
      id = 10;
      name = "Actors United";
      emblem = "actor";
      color = "#ea80fc";
      winPayout = 3.1;
      drawPayout = 2.7;
      losePayout = 1.6;
    },
    {
      id = 11;
      name = "Orbit Coders";
      emblem = "orbit";
      color = "#ff5252";
      winPayout = 2.7;
      drawPayout = 3.0;
      losePayout = 1.4;
    },
    {
      id = 12;
      name = "Stable Rocket";
      emblem = "stable";
      color = "#00e676";
      winPayout = 2.4;
      drawPayout = 3.9;
      losePayout = 1.5;
    },
    {
      id = 13;
      name = "Cycle Club";
      emblem = "club";
      color = "#ab00ff";
      winPayout = 2.0;
      drawPayout = 3.2;
      losePayout = 1.7;
    },
    {
      id = 14;
      name = "Transaction Tigers";
      emblem = "tigers";
      color = "#fbc02d";
      winPayout = 1.8;
      drawPayout = 4.3;
      losePayout = 2.1;
    },
    {
      id = 15;
      name = "MoTheGang";
      emblem = "mo";
      color = "#c3fdff";
      winPayout = 2.5;
      drawPayout = 3.6;
      losePayout = 1.6;
    },
    {
      id = 16;
      name = "Canon City";
      emblem = "canon";
      color = "#bdbdbd";
      winPayout = 2.9;
      drawPayout = 3.4;
      losePayout = 1.5;
    },
    {
      id = 17;
      name = "CRUD United";
      emblem = "crud";
      color = "#f50057";
      winPayout = 2.3;
      drawPayout = 3.8;
      losePayout = 1.7;
    },
    {
      id = 18;
      name = "Meta Knights";
      emblem = "meta";
      color = "#9e9d24";
      winPayout = 2.1;
      drawPayout = 4.1;
      losePayout = 1.6;
    },
    {
      id = 19;
      name = "IVirtualz";
      emblem = "ivirtualz";
      color = "#302b63";
      winPayout = 2.0;
      drawPayout = 3.0;
      losePayout = 1.5;
    },
  ]);
  var nextBetId = 0;
  var nextMatchId : Nat = 0;
  var nextCalculationRound : CalculationRound = 0;
  var currentRound : RoundNumber = 0;
  var roundStartTime = 0;
  var gameStartTime = 0;
  var platformEarnings = 0.0;

  let fixtures = Map.empty<RoundNumber, Fixture>();
  let uniqueMatches = Map.empty<MatchId, Match>();
  let roundMatches = Map.empty<RoundNumber, [MatchId]>();
  let matchBets = Map.empty<MatchId, [MatchBet]>();
  let uniqueBets = Map.empty<BetId, UserBet>();
  let userBets = Map.empty<Principal, [BetId]>();
  let uniqueRounds = Map.empty<RoundNumber, VirtualLeagueRound>();
  let roundTimeMapping = Map.empty<Int, RoundNumber>();
  let teamStatsMap = Map.empty<TeamId, TeamStats>();
  let uniqueTeamStats = Map.empty<TeamId, TeamStats>();
  let teamMatchups = Map.empty<MatchId, (TeamId, TeamId)>();
  let teamMatchesMap = Map.empty<TeamId, [MatchId]>();

  let matchEvents = Map.empty<Nat, Text>();
  let uniqueEventMatches = Map.empty<Nat, [Nat]>();
  let teamHistory = Map.empty<TeamId, [Nat]>();

  var roundTimerId : ?Timer.TimerId = null;

  var calculatedRounds = List.empty<Nat>();

  let uniqueLeagueRounds = Map.empty<Nat, [Nat]>();
  let lastNineRounds = Map.empty<Nat, Nat>();
  let first10Rounds = Map.empty<Nat, [Nat]>();
  let currentRoundMatches = Map.empty<Nat, Nat>();

  let seasonWinnerPredictions = Map.empty<Principal, TeamId>();
  let userBalances = Map.empty<Principal, Float>();

  let accessControlState = AccessControl.initState();

  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public type UserProfile = { name : Text };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      assert false;
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      assert false;
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      assert false;
    };
    userProfiles.add(caller, profile);
  };
};
