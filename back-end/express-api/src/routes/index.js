import express from 'express';
import {
  indexPage,
  GetCurrentPlayerValuesEndpoint,
  GetPlayerValueForMarketEndpoint,
  GetPrevPlayerValuesByDaysEndpoint,
  GetHistoricalPlayerValueByIdEndpoint,
  GetMFLDraftResultsEndpoint,
  GetMFLFutureDraftPicksEndpoint,
  GetMFLLeagueEndpoint,
  GetMFLLeagueStandingsEndpoint,
  GetMFLPlayersEndpoint,
  GetMFLPlayoffBracketsEndpoint,
  GetMFLRostersEndpoint,
  GetMFLScheduleEndpoint,
  GetMFLTransactionsEndpoint,
  GetMFLLeagueRulesEndpoint,
  GetFFDraftEndpoint,
  GetFFLeagueEndpoint,
  GetFFLeagueTransactionsEndpoint,
  GetFFRostersEndpoint,
  GetFFScheduleEndpoint,
  GetFFStandingsEndpoint,
  GetFFTeamDraftPicksEndpoint,
  GetFFTradesEndpoint,
  GetUserLeaguesEndpoint,
  GetConfigValuesEndpoint,
  GetPlayerDetailsEndpoint,
  GetPlayerPortfolioEndpoint,
  GetMFLLeaguesForUserEndpoint,
  GetLeagueFormatForLeague,
  PostMFLWaiverEndpoint,
  GetFFPCDraftEndpoint,
  GetFFPCLeagueEndpoint,
  GetFFPCLeagueTransactionsEndpoint,
  GetFFPCRostersEndpoint,
  GetFFPCScheduleEndpoint,
  GetFFPCStandingsEndpoint,
  GetFFPCUserLeaguesEndpoint,
  FetchAllGridResultsEndpoint,
  FetchAllHistoricalGridsEndpoint,
  FetchSearchedPlayersEndpoint,
  UpdateGridResultsEndpoint,
  GetNonOffensePlayersEndpoint,
  AddLeaguesToDatabaseEndpoint,
  GetTradesFromSearchEndpoint,
  GetRecentTradeVolumeEndpoint,
} from '../controllers';

const indexRouter = express.Router();
indexRouter.get('/', indexPage);

// Dynasty Daddy Endpoints
indexRouter.get('/player/all/today', GetCurrentPlayerValuesEndpoint);
indexRouter.get('/player/all/market/:market', GetPlayerValueForMarketEndpoint);
indexRouter.get('/player/all/prev/:intervalDays', GetPrevPlayerValuesByDaysEndpoint);
indexRouter.get('/player/:id', GetHistoricalPlayerValueByIdEndpoint);
indexRouter.get('/player/details/:id', GetPlayerDetailsEndpoint);
indexRouter.get('/player/all/special', GetNonOffensePlayersEndpoint);
indexRouter.post('/portfolio', GetPlayerPortfolioEndpoint);
indexRouter.get('/config/all', GetConfigValuesEndpoint);
indexRouter.post('/league/format', GetLeagueFormatForLeague);
indexRouter.get('/grid/players', FetchSearchedPlayersEndpoint);
indexRouter.get('/grid/archive', FetchAllHistoricalGridsEndpoint);
indexRouter.post('/grid/results/add', UpdateGridResultsEndpoint);
indexRouter.get('/grid/results', FetchAllGridResultsEndpoint);
indexRouter.post('/league/add', AddLeaguesToDatabaseEndpoint);
indexRouter.post('/trade/search', GetTradesFromSearchEndpoint);
indexRouter.get('/trade/volume', GetRecentTradeVolumeEndpoint);

// MFL Wrapper Endpoints
indexRouter.post('/mfl/league', GetMFLLeagueEndpoint);
indexRouter.post('/mfl/players', GetMFLPlayersEndpoint);
indexRouter.post('/mfl/transactions', GetMFLTransactionsEndpoint);
indexRouter.post('/mfl/futureDraftPicks', GetMFLFutureDraftPicksEndpoint);
indexRouter.post('/mfl/leagueStandings', GetMFLLeagueStandingsEndpoint);
indexRouter.post('/mfl/rosters', GetMFLRostersEndpoint);
indexRouter.post('/mfl/draftResults', GetMFLDraftResultsEndpoint);
indexRouter.post('/mfl/playoffBrackets', GetMFLPlayoffBracketsEndpoint);
indexRouter.post('/mfl/schedule', GetMFLScheduleEndpoint);
indexRouter.post('/mfl/rules', GetMFLLeagueRulesEndpoint);
indexRouter.post('/mfl/leagues', GetMFLLeaguesForUserEndpoint);
indexRouter.post('/mfl/waiver', PostMFLWaiverEndpoint);

// Fleaflicker Wrapper Endpoints
indexRouter.get('/ff/league', GetFFLeagueEndpoint);
indexRouter.get('/ff/rosters', GetFFRostersEndpoint);
indexRouter.get('/ff/transactions', GetFFLeagueTransactionsEndpoint);
indexRouter.get('/ff/schedule', GetFFScheduleEndpoint);
indexRouter.get('/ff/leagueStandings', GetFFStandingsEndpoint);
indexRouter.get('/ff/draftResults', GetFFDraftEndpoint);
indexRouter.get('/ff/futureDraftPicks', GetFFTeamDraftPicksEndpoint);
indexRouter.get('/ff/trades', GetFFTradesEndpoint);
indexRouter.get('/ff/user', GetUserLeaguesEndpoint);

// FFPC Wrapper Endpoints
indexRouter.get('/ffpc/league', GetFFPCLeagueEndpoint);
indexRouter.get('/ffpc/rosters', GetFFPCRostersEndpoint);
indexRouter.get('/ffpc/transactions', GetFFPCLeagueTransactionsEndpoint);
indexRouter.get('/ffpc/schedule', GetFFPCScheduleEndpoint);
indexRouter.get('/ffpc/leagueStandings', GetFFPCStandingsEndpoint);
indexRouter.get('/ffpc/draftResults', GetFFPCDraftEndpoint);
indexRouter.get('/ffpc/user', GetFFPCUserLeaguesEndpoint);

export default indexRouter;
