import {Component, OnInit} from '@angular/core';
import {SleeperService} from '../../services/sleeper.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SleeperTeam} from '../../model/SleeperLeague';
import {PowerRankingsService} from '../services/power-rankings.service';
import {PlayerService} from '../../services/player.service';
import {KTCPlayer} from '../../model/KTCPlayer';
import {PlayerComparisonService} from '../services/player-comparison.service';
import {TransactionsService} from '../services/transactions.service';
import {TransactionUI} from '../model/transaction';
import {ConfigService} from '../../services/init/config.service';
import {BaseComponent} from '../base-component.abstract';
import {LeagueSwitchService} from '../services/league-switch.service';

@Component({
  selector: 'app-fantasy-team-details',
  templateUrl: './fantasy-team-details.component.html',
  styleUrls: ['./fantasy-team-details.component.css']
})
export class FantasyTeamDetailsComponent extends BaseComponent implements OnInit {

  /** selected fantasy team */
  selectedTeam: SleeperTeam;

  /** full list of team activites */
  teamActivity: TransactionUI[] = [];

  /** filtered list of team activities */
  filterTeamActivity: TransactionUI[] = [];

  /** roster of players */
  roster: KTCPlayer[] = [];

  /** activity filter */
  activitySearchVal: string;

  /** show more activities */
  activityShowMore: boolean = false;

  /** if false page is not loaded yet */
  pageLoaded: boolean = false;

  constructor(public sleeperService: SleeperService,
              private route: ActivatedRoute,
              public powerRankingsService: PowerRankingsService,
              public playerService: PlayerService,
              private playerComparisonService: PlayerComparisonService,
              private router: Router,
              private leagueSwitchService: LeagueSwitchService,
              public transactionsService: TransactionsService,
              public configService: ConfigService) {
    super();
  }

  ngOnInit(): void {
    this.addSubscriptions(
      this.route.queryParams.subscribe(params => {
        this.leagueSwitchService.loadFromQueryParams(params);
      }),
      this.leagueSwitchService.leagueChanged.subscribe(() => {
        this.getSelectedTeam();
      }),
    );
    if (this.sleeperService.leagueLoaded && this.sleeperService.selectedLeague) {
      this.getSelectedTeam();
    }
  }

  getSelectedTeam(): void {
    const ownerName = this.route.snapshot.paramMap.get('ownerName');
    // get selected team from sleeper data
    const teamIndex = this.sleeperService.sleeperTeamDetails.map(e => e.owner?.ownerName).indexOf(ownerName);
    this.selectedTeam = this.sleeperService.sleeperTeamDetails[teamIndex];
    // generate roster and sort
    for (const sleeperId of this.selectedTeam.roster.players) {
      const player = this.playerService.getPlayerBySleeperId(sleeperId);
      if (player) {
        this.roster.push(player);
      }
    }
    this.roster.sort((a, b) => {
      if (this.sleeperService.selectedLeague.isSuperflex) {
        return b.sf_trade_value - a.sf_trade_value;
      } else {
        return b.trade_value - a.trade_value;
      }
    });

    this.pageLoaded = true;

    this.loadTransactionHistory();
  }

  loadTransactionHistory(): void {
    // generates team activities and cleans data for display
    this.teamActivity = this.transactionsService.generateTeamTransactionHistory(this.selectedTeam);
    this.activityShowMore = this.teamActivity.length <= 5;
    this.filterTeamActivity = this.teamActivity.slice(0, 5);
  }

  /**
   * get average points for team
   */
  getAveragePoints(): number {
    return Math.round(this.selectedTeam.roster.teamMetrics.fpts
      / (this.sleeperService.selectedLeague.playoffStartWeek - this.sleeperService.selectedLeague.startWeek));
  }

  /**
   * open player comparison page
   * @param selectedPlayer selected player
   */
  openPlayerComparison(selectedPlayer: KTCPlayer): void {
    this.playerComparisonService.addPlayerToCharts(selectedPlayer);
    this.router.navigate(['players/comparison'],
      {
        queryParams:
          {
            league: this.sleeperService.selectedLeague?.leagueId,
            user: this.sleeperService.sleeperUser?.userData?.username,
            year: this.sleeperService.selectedYear
          }
      }
    );
  }

  /**
   * filters activities based on search preferences
   */
  updateActivityFilter(): void {
    if (this.activitySearchVal && this.activitySearchVal.length > 0) {
      const fullFilteredList = this.teamActivity.filter(activity => {
        return (activity.adds.findIndex(add => add.playerName.toLowerCase().includes(this.activitySearchVal.toLowerCase())) >= 0
          || activity.drops.findIndex(drop => drop.playerName.toLowerCase().includes(this.activitySearchVal.toLowerCase())) >= 0
          || activity.type.toLowerCase().includes(this.activitySearchVal.toLowerCase())
          || activity.headerDisplay.toLowerCase().includes(this.activitySearchVal.toLowerCase()));
      });
      this.activityShowMore ? this.filterTeamActivity = fullFilteredList.slice() : this.filterTeamActivity = fullFilteredList.slice(0, 5);
    } else {
      this.activityShowMore ? this.filterTeamActivity =
        this.teamActivity.slice() : this.filterTeamActivity = this.teamActivity.slice(0, 5);
    }
  }

  /**
   * set filter value to trade to only show team trades
   */
  showOnlyTrades(): void {
    this.activitySearchVal = 'trade';
    this.updateActivityFilter();
  }
}
