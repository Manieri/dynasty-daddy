import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PowerRankingsComponent } from './components/power-rankings/power-rankings.component';
import { PlayerValuesComponent } from './components/player-values/player-values.component';
import { DraftComponent } from './components/draft/draft.component';
import { StandingsComponent } from './components/standings/standings.component';
import { PlayerComparisonsComponent } from './components/player-comparisons/player-comparisons.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { FantasyTeamDetailsComponent } from './components/fantasy-team-details/fantasy-team-details.component';
import { PlayoffCalculatorComponent } from './components/playoff-calculator/playoff-calculator.component';
import { AboutComponent } from './components/about/about.component';
import { PlayerStatisticsComponent } from './components/player-statistics/player-statistics.component';
import { TradeCenterComponent } from './components/trade-center/trade-center.component';
import { TradeFinderComponent } from './components/trade-finder/trade-finder.component';
import { WrappedComponent } from './components/wrapped/wrapped.component';
import { StandardPageComponent } from './components/standard-page/standard-page.component';
import { FantasyPortfolioComponent } from './components/fantasy-portfolio/fantasy-portfolio.component';
import { GridGameComponent } from './components/grid-game/grid-game.component';
import { LeagueFormatComponent } from './components/league-format/league-format.component';
import { TradeDatabaseComponent } from './components/trade-database/trade-database.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'players/values',
      component: PlayerValuesComponent
    },
    {
      path: 'players/comparison',
      component: PlayerComparisonsComponent
    },
    {
      path: 'players/statistics',
      component: PlayerStatisticsComponent
    },
    {
      path: 'players/trade',
      component: TradeCenterComponent
    },
    {
      path: 'players/trade/database',
      component: TradeDatabaseComponent
    },
    {
      path: 'players/details/:playerNameId',
      component: PlayerDetailsComponent
    },
    {
      path: 'league/team/:ownerName',
      component: FantasyTeamDetailsComponent
    },
    {
      path: 'league/rankings',
      component: PowerRankingsComponent
    },
    {
      path: 'league/trade/finder',
      component: TradeFinderComponent
    },
    {
      path: 'league/probability',
      component: PlayoffCalculatorComponent
    },
    {
      path: 'league/standings',
      component: StandingsComponent
    },
    {
      path: 'league/draft',
      component: DraftComponent
    },
    {
      path: 'league/portfolio',
      component: FantasyPortfolioComponent
    },
    {
      path: 'league/format',
      component: LeagueFormatComponent
    },
    {
      path: 'gridiron',
      component: GridGameComponent
    },
    {
      path: 'home',
      redirectTo: ''
    },
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'login',
      redirectTo: ''
    }],
    component: StandardPageComponent
  },
  {
    path: 'wrapped',
    component: WrappedComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: true, scrollPositionRestoration: 'enabled' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
