import { Component } from '@angular/core';
import { PairingsService } from './pairings.service';
import { Participant } from './participant';

@Component({
  selector: 'pm-pairings',
  templateUrl: './pairings.component.html',
  styleUrls: ['./pairings.component.css'],
  providers: [ PairingsService ]
})

export class PairingsComponent {

	pairings: Object[];

	constructor(private _pairingsService: PairingsService) {}

	ngOnInit(): void {
		this._pairingsService.getPairings().subscribe(
			data => this.pairings = data
		);
	}

	onShuffleClick() {
		this.pairings = this._pairingsService.onShuffle();
	}

}