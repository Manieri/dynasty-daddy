import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TeamPowerRanking } from '../../model/powerRankings';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortable } from '@angular/material/sort';
import { FantasyMarket, FantasyPlayer } from '../../../model/assets/FantasyPlayer';
import { LeagueService } from '../../../services/league.service';
import { ConfigService } from '../../../services/init/config.service';
import { PlayerService } from '../../../services/player.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { DisplayService } from '../../../services/utilities/display.service';
import { LeagueSwitchService } from '../../services/league-switch.service';
import { PowerRankingMarket, PowerRankingTableView, PowerRankingsService } from '../../services/power-rankings.service';
import { BaseComponent } from '../../base-component.abstract';
import { SimpleTextModal } from '../../sub-components/simple-text-modal/simple-text-modal.component';
import { DataSourcesInfo } from 'src/app/model/toolHelpModel';
import { MatDialog } from '@angular/material/dialog';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { UntypedFormControl } from '@angular/forms';

// details animation
export const detailExpand = trigger('detailExpand',
  [
    state('collapsed, void', style({ height: '0px' })),
    state('expanded', style({ height: '*' })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
  ]);

@Component({
  selector: 'app-power-rankings-table',
  templateUrl: './power-rankings-table.component.html',
  styleUrls: ['./power-rankings-table.component.scss'],
  animations: [detailExpand],
})
export class PowerRankingsTableComponent extends BaseComponent implements OnInit, OnChanges {

  // team power rankings generated from service
  @Input()
  powerRankings: TeamPowerRanking[];

  // is league superflex, input
  @Input()
  isSuperFlex: boolean;

  // input columns to display
  @Input()
  columnsToDisplay: string[] = [];

  // toggles the advanced setting bar
  showAdvancedSettings: boolean = false;

  // available metrics to select for table
  availableMetrics: any[] = [
    { key: 'owner', display: 'Fantasy Manager' },
    { key: 'team', display: 'NFL Team' },
    { key: 'record', display: 'Record' },
    { key: 'tier', display: 'Fantasy Tier' },
    { key: 'overallRank', display: 'Overall Rank' },
    { key: 'starterRank', display: 'NFL Team' },
    { key: 'qbStarterRank', display: 'QB Contender Rank' },
    { key: 'qbRank', display: 'QB Dynasty Rank' },
    { key: 'rbStarterRank', display: 'RB Contender Rank' },
    { key: 'rbRank', display: 'RB Dynasty Rank' },
    { key: 'wrStarterRank', display: 'WR Contender Rank' },
    { key: 'wrRank', display: 'WR Dynasty Rank' },
    { key: 'teStarterRank', display: 'TE Contender Rank' },
    { key: 'teRank', display: 'TE Dynasty Rank' },
    { key: 'flexStarterRank', display: 'Flex Contender Rank' },
    { key: 'draftRank', display: 'Draft Capital Rank' },
  ];

  // datasource for mat table
  dataSource: MatTableDataSource<TeamPowerRanking> = new MatTableDataSource<TeamPowerRanking>();

  // determines if team is top 3rd or bottom 3rd of league
  alertThreshold: number;

  // mat sort element
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // search name
  searchVal: string = '';

  // used to keep track of the displayed teams in table
  displayedRankingsSize: number;

  /** team ranking cache */
  powerRankingCache = {};

  /** Player cache for power rankings */
  playerCache = {};

  constructor(public leagueService: LeagueService,
    public configService: ConfigService,
    public playerService: PlayerService,
    public powerRankingsService: PowerRankingsService,
    public leagueSwitchService: LeagueSwitchService,
    public displayService: DisplayService,
    private dialog: MatDialog,
    private gaService: GoogleAnalyticsService,
    private clipboard: Clipboard) {
    super();
  }

  ngOnInit(): void {
    this.alertThreshold = this.powerRankings.length / 3;
    this.createNewTableDataSource(this.powerRankings);
    this.refreshPowerRankingCache();
  }

  ngOnChanges(): void {
    this.dataSource.data = this.powerRankings;
    this.refreshPowerRankingCache();
  }

  /**
   * Refresh the power ranking value cache
   * Used so that DOM doesn't have to make a bunch of redundant calls
   * for player value, team value etc
   */
  refreshPowerRankingCache(): void {
    this.playerCache = {};

    // sort rosters by selected metric
    this.powerRankingsService.powerRankings = this.powerRankingsService.sortTeamPowerRankingGroups(
      this.powerRankingsService.powerRankings,
      this.isSuperFlex
    )

    this.playerService.playerValues.forEach(player => {
      this.playerCache[player.name_id] = {
        value: this.isSuperFlex ? player.sf_trade_value : player.trade_value,
        isRed: (this.isSuperFlex ? player.sf_trade_value : player.trade_value) <
          (this.playerService.selectedMarket !== FantasyMarket.KeepTradeCut ? 1500 : 2000),
        isGreen: (this.isSuperFlex ? player.sf_trade_value : player.trade_value) >
          (this.playerService.selectedMarket !== FantasyMarket.KeepTradeCut ? 5500 : 6000),
      }
    });
    this.powerRankingCache = {};
    this.powerRankings.forEach(team => {
      this.powerRankingCache[team.team.roster.rosterId] = {
        tier: this.displayService.getTierFromNumber(team.tier),
        value: this.isSuperFlex ? team.sfTradeValueOverall : team.tradeValueOverall,
        rank: team.overallRank,
        isGreen: team.overallRank < this.alertThreshold,
        isRed: team.overallRank > this.alertThreshold * 2,
        wins: team.team.roster.teamMetrics?.wins || 0,
        losses: team.team.roster.teamMetrics?.losses || 0,
        rosters: {}
      }
      team.roster.forEach((group) => {
        switch (this.powerRankingsService.powerRankingsTableView) {
          case PowerRankingTableView.Starters: {
            this.powerRankingCache[team.team.roster.rosterId].rosters[group.position] = {
              value: group.starterValue,
              rank: group.starterRank,
              isRed: group.starterRank > this.alertThreshold * 2,
              isGreen: group.starterRank < this.alertThreshold
            }
            break;
          }
          default: {
            this.powerRankingCache[team.team.roster.rosterId].rosters[group.position] = {
              value: this.isSuperFlex ? group.sfTradeValue : group.tradeValue,
              rank: group.rank,
              isRed: group.rank > this.alertThreshold * 2,
              isGreen: group.rank < this.alertThreshold
            }
            break;
          }
        }
      });
      // Rank Contenders Flex
      if (PowerRankingTableView.Starters) {
        this.powerRankingCache[team.team.roster.rosterId].rosters['FLEX'] = {
          value: team.flexStarterValue,
          rank: team.flexStarterRank,
          isRed: team.flexStarterRank > this.alertThreshold * 2,
          isGreen: team.flexStarterRank < this.alertThreshold
        }
      }
      this.powerRankingCache[team.team.roster.rosterId].rosters[team.picks.position] = {
        value: this.isSuperFlex ? team.picks.sfTradeValue : team.picks.tradeValue,
        rank: team.picks.rank,
        isRed: team.picks.rank > this.alertThreshold * 2,
        isGreen: team.picks.rank < this.alertThreshold
      }
    });
  }

  /**
   * checks if list is expanded or not
   * @param element team power ranking
   * returns true of expanded
   */
  checkExpanded(element: TeamPowerRanking): boolean {
    let flag = false;
    this.powerRankingsService.expandedElement.forEach(e => {
      if (e === element.team.owner) {
        flag = true;
      }
    });
    return flag;
  }

  /**
   * handles when row is clicked
   * @param element team row that was clicked
   */
  pushPopElement(element: TeamPowerRanking): void {
    const index = this.powerRankingsService.expandedElement.indexOf(element.team.owner);
    if (index === -1) {
      this.powerRankingsService.expandedElement.push(element.team.owner);
    } else {
      this.powerRankingsService.expandedElement.splice(index, 1);
    }
  }

  /**
   * expands all power rankings details
   */
  expandCollapseAll(): void {
    this.dataSource.data = this.powerRankings;
    if (this.powerRankingsService.expandedElement.length !== this.powerRankings.length) {
      this.powerRankingsService.expandedElement = this.powerRankings.map(t => t.team.owner);
    } else {
      this.powerRankingsService.expandedElement = [];
    }
  }

  /**
   * is player one of the teams starters?
   * @param team team power ranking
   * @param player player to check
   * returns true if player is starter on team
   */
  isStarter(team: TeamPowerRanking, player: FantasyPlayer): boolean {
    return team.starters.includes(player);
  }

  /**
   * is player injured
   * @param player player to check
   * returns true if player is injured
   */
  isInjured(player: FantasyPlayer): boolean {
    const injuries = ['PUP', 'IR', 'Sus', 'COV'];
    return injuries.includes(player.injury_status);
  }

  /**
   * copies whole team to clipboard
   * @param rosterId team id
   */
  copyWholeFromTeam(team: TeamPowerRanking): void {
    const allPlayersRoster = 'Team\n' +
      `QB: ${this.getListOfPlayerNames('qb', team.roster[0].players)}\n` +
      `RB: ${this.getListOfPlayerNames('rb', team.roster[1].players)}\n` +
      `WR: ${this.getListOfPlayerNames('wr', team.roster[2].players)}\n` +
      `TE: ${this.getListOfPlayerNames('te', team.roster[3].players)} `;
    this.clipboard.copy(allPlayersRoster);
  }

  /**
   * get list of players by position
   * @param pos string
   * @param players list of players
   * @private
   */
  private getListOfPlayerNames(pos: string, players: FantasyPlayer[]): string {
    const filteredPlayers = [];
    players.map(player => {
      if (player.position.toLowerCase() === pos.toLowerCase()) {
        filteredPlayers.push(player.full_name);
      }
    });
    return filteredPlayers.join(', ');
  }

  /**
   * expand all rows for searching
   */
  searchFilterPowerRankings(): void {
    const allTeams = this.powerRankings.slice();
    const filteredRows: TeamPowerRanking[] = [];
    allTeams.map(team => {
      // if match add to list bool
      let addToTable = false;
      // loop thru team rosters and match names
      team.roster.map(roster =>
        roster.players.map(player => {
          if (player.full_name.toLowerCase().includes(this.searchVal.toLowerCase())) {
            addToTable = true;
          }
        })
      );
      // do owner and team name match
      if (
        team.team.owner.ownerName.toLowerCase().includes(this.searchVal.toLowerCase())
        || team.team.owner.teamName.toLowerCase().includes(this.searchVal.toLowerCase())
      ) {
        addToTable = true;
      }
      // add team to filtered list
      if (addToTable) {
        filteredRows.push(team);
      }
    }
    );
    // update table with filtered results
    this.createNewTableDataSource(filteredRows);
    this.powerRankingsService.expandedElement = filteredRows.map(t => t.team.owner);
  }

  /**
   * helper function to generate new table based on input field
   * needed to have sorting across searches and default view
   * @param powerRankings
   * @private
   */
  private createNewTableDataSource(powerRankings: TeamPowerRanking[]): void {
    this.displayedRankingsSize = powerRankings.length;
    this.dataSource = new MatTableDataSource<TeamPowerRanking>(powerRankings);

    // sorting algorithm
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'team') {
        return item.team.owner?.teamName;
      } else if (property === 'owner') {
        return item.team.owner?.ownerName;
      } else if (property === 'qbRank') {
        return item.roster[0].rank;
      } else if (property === 'rbRank') {
        return item.roster[1].rank;
      } else if (property === 'wrRank') {
        return item.roster[2].rank;
      } else if (property === 'teRank') {
        return item.roster[3].rank;
      } else if (property === 'qbStarterRank') {
        return item.roster[0].starterRank;
      } else if (property === 'rbStarterRank') {
        return item.roster[1].starterRank;
      } else if (property === 'wrStarterRank') {
        return item.roster[2].starterRank;
      } else if (property === 'teStarterRank') {
        return item.roster[3].starterRank;
      } else if (property === 'flexStarterRank') {
        return item.flexStarterRank;
      } else if (property === 'draftRank') {
        return item.picks.rank;
      } else if (property === 'overallRank') {
        return item.overallRank;
      } else if (property === 'record') {
        return item.team?.roster?.teamMetrics?.wins || 0;
      } else {
        return item[property];
      }
    };
    this.sort.sort(({ id: (this.powerRankingsService.powerRankingsTableView === PowerRankingTableView.TradeValues ? 'overallRank' : 'starterRank'), start: 'asc' } as MatSortable));
    this.dataSource.sort = this.sort;
  }

  /**
   * returns if power rankings are expanded
   */
  isExpanded(): boolean {
    return this.powerRankingsService.expandedElement.length === this.powerRankings.length;
  }

  /**
   * reset search filter and table
   */
  resetSearchFilter(): void {
    this.searchVal = '';
    this.createNewTableDataSource(this.powerRankings);
  }

  /**
   * update the fantasy market and power ranking selection
   * @param $event 
   */
  updateFantasyMarket($event): void {
    this.gaService.event('click', `click_${$event.value}`, 'fantasy_market')
    this.powerRankingsService.rankingMarket = $event.value;
    if (this.powerRankingsService.rankingMarket !== PowerRankingMarket.ADP) {
      this.addSubscriptions(this.playerService.loadPlayerValuesForFantasyMarket$($event.value).subscribe(() => {
        this.playerService.selectedMarket = this.powerRankingsService.rankingMarket.valueOf();
      }));
    }
    this.refreshPowerRankingCache();
  }

  openDataSourcesModal(): void {
    this.dialog.open(SimpleTextModal
      , {
        minHeight: '350px',
        minWidth: this.configService.isMobile ? '200px' : '500px',
        data: {
          headerText: 'About our Data Sources',
          categoryList: DataSourcesInfo
        }
      }
    );
  }
}