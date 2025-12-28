# IVirtualz - Virtual Premier League Betting Game

## Overview
IVirtualz is a decentralized virtual football betting game that simulates a Premier League-style tournament with 20 teams. The game runs continuous seasons with automated match generation, scoring, and betting mechanics using on-chain randomness.

## Authentication
- Requires Internet Identity authentication for all user participation
- Users must be authenticated to place bets and view personal statistics

## Game Structure
- **20 teams** participate in each season
- **36 rounds** per season with automatic reset after completion
- Each round consists of **10 matches**
- New rounds start every **15 minutes**
- All match pairings generated randomly using on-chain randomness
- Match scores and outcomes determined by on-chain random generation

## Betting System
- Users place bets on match outcomes: home win, draw, away win
- Support for **single bets** (one match prediction)
- Support for **multi-bets** (multiple match predictions in one bet slip)
- Multi-bet winnings use multiplier system - more correct predictions = higher multiplier
- All betting uses simulated ICP tokens (free to play, no real token transfers)
- Bet states and results stored on-chain for transparency

## Reward Distribution
- **30%** of simulated rewards distributed to early-season participants
- **2%** of total platform earnings shared among users who correctly predict the season's highest-scoring team
- Rewards calculated and distributed automatically at season end

## Backend Data Storage
- Team information and current season standings
- Match fixtures, results, and scores for all rounds
- User betting history and current active bets
- Season statistics and leaderboards
- User reward balances and distribution records

## Backend Operations
- Generate random team pairings for each round
- Calculate random match scores and determine winners
- Process bet placements and validate outcomes
- Calculate winnings and apply multipliers for multi-bets
- Manage season progression and automatic resets
- Distribute rewards to eligible users

## Frontend Features
- Live match schedule showing current and upcoming fixtures
- Round countdown timer (15-minute intervals)
- Match results history and team standings table
- Bet slip creator for single and multi-bet placement
- User betting history and active bets display
- Season leaderboard showing top performers
- Team statistics and current season progress
- Modern football league table layout design

## Query Functions
The backend provides query functions for:
- Current fixtures and match schedules
- Individual player bets and results
- Team standings and statistics
- Season leaderboard and rankings
- Match history and outcomes
