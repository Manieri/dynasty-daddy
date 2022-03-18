import {Component, OnInit} from '@angular/core';
import {SleeperService} from '../../services/sleeper.service';
import {PowerRankingsService} from '../services/power-rankings.service';
import {PlayerService} from '../../services/player.service';
import {BaseComponent} from '../base-component.abstract';

@Component({
  selector: 'app-power-rankings',
  templateUrl: './power-rankings.component.html',
  styleUrls: ['./power-rankings.component.css']
})
export class PowerRankingsComponent extends BaseComponent implements OnInit {

  constructor(public sleeperService: SleeperService,
              public powerRankingService: PowerRankingsService,
              private playersService: PlayerService) {
    super();
  }

  ngOnInit(): void {
    // TODO ugly fix for race condition on adding upcoming draft picks to playoff calculator
    if (this.sleeperService.upcomingDrafts.length !== 0) {
      this.powerRankingService.reset();
      this.powerRankingService.mapPowerRankings(this.sleeperService.sleeperTeamDetails, this.playersService.playerValues);
    }
  }
}
