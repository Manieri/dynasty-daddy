import { Injectable } from "@angular/core";
import { Status } from "../model/status";
import { FantasyPlayerApiService } from "src/app/services/api/fantasy-player-api.service";
import { Observable, Subject, of } from "rxjs";
import { ConfigKeyDictionary, ConfigService, LocalStorageDictionary } from "src/app/services/init/config.service";
import { GridPlayer } from "../model/gridPlayer";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GridGameService {

  status: Status = Status.LOADING;

  /** grid info from the db */
  gridDict = {};

  /** validation subject */
  validateGridSelection$: Subject<string> = new Subject<string>();

  /** players loaded subject */
  gridPlayersLoaded$: Subject<string> = new Subject<string>();

  /** already used player ids */
  alreadyUsedPlayers = [];

  /** all players to choose from */
  gridPlayers: GridPlayer[] = [];

  /** selected results grid */
  gridResults: any[][] = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
  ];

  /** how many guesses have been correct for each cell */
  globalSelectionMapping = {};

  /** most common answers for each spot on the grid */
  globalCommonAnsMapping = [];

  /** dict of college to espn id for img */
  collegeLogoMap = {
    'Michigan': 130,
    'Texas Christian': 2628,
    'Georgia': 61,
    'Ohio State': 194,
    'Florida': 57,
    'Alabama': 333,
    'Southern California': 30,
    'Louisiana State': 99,
    'Clemson': 228,
    'South Carolina': 2579,
    'North Carolina State': 152,
    'North Carolina': 153,
    'Wisconsin': 275,
    'Oregon': 2483,
    'Florida State': 52,
    'Texas': 251,
    'Oklahoma': 201,
    'Notre Dame': 87
  }

  /** guesses left to make */
  guessesLeft: number = 9;

  constructor(private fantasyPlayersAPIService: FantasyPlayerApiService,
    private configService: ConfigService) { }

  /** 
   * verifying wrapper that handles the results of a guess
   * @param player gridplayer
   * @param coors number array for grid coors
   */
  isSelectedPlayerCorrect(player: GridPlayer, coords: number[]): void {
    this.verifySelectedPlayer(player, [this.gridDict['xAxis'][coords[0]], this.gridDict['yAxis'][coords[1]]]).subscribe(res => {
      this.guessesLeft--;
      if (res) {
        const x = coords[0] + 1;
        const y = coords[1] + 1;
        const cellNum = (coords[1] * 3) + coords[0];
        const percent = this.getPercentForPlayerSelected(player.id, cellNum);
        this.gridResults[x][y] = { name: player.name, img: player.headshot_url, id: player.id, percent: percent };
        this.alreadyUsedPlayers.push(player.id);
        if (this.configService.getConfigOptionByKey(ConfigKeyDictionary.GRIDIRON_WRITE_BACK)?.configValue === 'true') {
          this.fantasyPlayersAPIService.postCorrectGridironAnswer(player.id, cellNum, player.name).subscribe(_ => {
            // do nothing
          })
        }
      }
      localStorage.setItem(LocalStorageDictionary.GRIDIRON_ITEM, JSON.stringify({ grid: this.gridDict, guesses: this.guessesLeft, results: this.gridResults, alreadyUsedPlayers: this.alreadyUsedPlayers }))
      this.validateGridSelection$.next();
    })
  }

  /**
   * Verify if selection in correct
   * @param player GridPlayer
   * @param categories categories to verify on
   */
  verifySelectedPlayer(player: GridPlayer, categories: any[]): Observable<boolean> {
    let isValid = true;
    categories.forEach(category => {
      switch (category.type) {
        case 'jersey_number': {
          isValid = player?.jersey_numbers?.includes(category.value) && isValid;
          break;
        }
        case 'college': {
          isValid = player?.college === category.value && isValid;
          break;
        }
        case 'award': {
          isValid = JSON.stringify(player?.awards_json) !== JSON.stringify({}) && player?.awards_json?.[category.value] !== '' && isValid;
          break;
        }
        case 'stat': {
          isValid = player?.stats_json?.[category.value] && isValid;
          break;
        }
        default: {
          isValid = player?.teams?.includes(category.value) && isValid;
        }
      }
    });
    // need a delay otherwise results component wont load for some reason
    return of(isValid).pipe(delay(500));
  }

  /**
   * calculate total selections for all grids
   */
  calculateTotalSelections(): void {
    this.fantasyPlayersAPIService.fetchAllGridironResults().subscribe(res => {
      res.forEach(obj => {
        const { cellnum } = obj;
        if (this.globalSelectionMapping[cellnum]) {
          this.globalSelectionMapping[cellnum] += obj.guesses;
          if (this.globalCommonAnsMapping[cellnum].guesses < obj.guesses) {
            this.globalCommonAnsMapping[cellnum] = obj;
          }
        } else {
          this.globalSelectionMapping[cellnum] = obj.guesses;
          this.globalCommonAnsMapping[cellnum] = obj;
        }
      });
    })
  }

  loadGridPlayers(): void {
    const condition = this.configService.getConfigOptionByKey('daily_grid_client')?.configValue == 'true';
    if (condition) {
      this.fantasyPlayersAPIService.fetchGridironPlayers().subscribe(res => {
        this.gridPlayers = res;
        this.gridPlayersLoaded$.next();
      })
    } else {
      this.gridPlayersLoaded$.next();
    }
  }

  /**
   * Get percent for a player being selected
   * @param playerId player id
   * @param cellNum cell number
   */
  getPercentForPlayerSelected(playerId: number, cellNum: number): number {
    let percent = 0.0001
    if (!this.globalSelectionMapping[cellNum]) {
      return 1;
    }
    this.fantasyPlayersAPIService.fetchAllGridironResults().subscribe(res => {
      res.forEach(p => {
        if (p.player_id === playerId && p.cellnum === cellNum) {
          percent = p.guesses / this.globalSelectionMapping[cellNum];
          return;
        }
      })
    })
    return percent;
  }
}
