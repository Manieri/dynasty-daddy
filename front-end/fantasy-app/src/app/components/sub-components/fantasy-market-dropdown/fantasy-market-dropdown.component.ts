import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FantasyMarket } from 'src/app/model/assets/FantasyPlayer';
import { ConfigService } from 'src/app/services/init/config.service';
import { PlayerService } from 'src/app/services/player.service';
import { DataSourcesInfo } from 'src/app/model/toolHelpModel';
import { SimpleTextModal } from '../simple-text-modal/simple-text-modal.component';

@Component({
    selector: 'fantasy-market-dropdown',
    templateUrl: './fantasy-market-dropdown.component.html',
    styleUrls: ['./fantasy-market-dropdown.component.css']
})
export class FantasyMarketDropdown implements OnInit {

    @Input()
    selectedMarket: FantasyMarket = FantasyMarket.KeepTradeCut;

    @Output()
    selectedMarketChange: EventEmitter<FantasyMarket> = new EventEmitter<FantasyMarket>();

    // Dynasty Fantasy Markets
    dynastyFantasyMarkets = [
        { 'num': FantasyMarket.KeepTradeCut, 'value': 'KeepTradeCut' },
        { 'num': FantasyMarket.FantasyCalc, 'value': 'FantasyCalc' },
        { 'num': FantasyMarket.DynastyProcess, 'value': 'DynastyProcess' },
        { 'num': FantasyMarket.DynastySuperflex, 'value': 'DynastySuperflex' }
    ]

    // Redraft Fantasy Markets
    redraftFantasyMarkets = [
        { 'num': FantasyMarket.KeepTradeCutRedraft, 'value': 'KeepTradeCut (Redraft)' },
        { 'num': FantasyMarket.FantasyCalcRedraft, 'value': 'FantasyCalc (Redraft)' },
    ]

    constructor(private playerService: PlayerService,
        private configService: ConfigService,
        private dialog: MatDialog) {

    }

    ngOnInit() {

    }

    changeMarket($event: any) {
        this.playerService.loadPlayerValuesForFantasyMarket$($event.value).subscribe(() => {
            this.selectedMarketChange.emit($event.value);
        });
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