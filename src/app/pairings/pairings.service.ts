import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Participant } from './participant';

@Injectable()
export class PairingsService {

    private _dataUrl = '../src/data/users.json';
    private _participants: Participant[];

    constructor(private _http: Http) {}

    // fetch all existing users
    getPairings(): Observable<Object[]> {
        return this._http.get(this._dataUrl)
             .map((res: Response) => <Participant[]> res.json().users)
             .do(data => this.setParticipantList(data))
             .map(data => this.pairParticipants(data))
             .catch(error => this.handleError(error));
    }

    private setParticipantList(input: Participant[]): void {
        this._participants = input;
    }

    private pairParticipants(input: Participant[]): Object[] {

        const allocatedPairs = [];
        const temp = input;
        let i = 0;

        while (i <= temp.length) {
            if (i === temp.length - 1) {
                const d = {
                    'buyer': temp[i],
                    'receiver':  temp[0]
                };
                allocatedPairs.push(d);
                break;
            }
            if (temp[i].guid !== temp[i + 1].guid) {
                const d = {
                    'buyer': temp[i],
                    'receiver':  temp[i + 1]
                };
                allocatedPairs.push(d);
            }
            i++;
        }

        return this.shuffle(allocatedPairs);
    }

    private shuffle(input: any[]): any[] {
        const result = input;

        for (let i = result.length - 1; i >= 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            const itemAtIndex = result[randomIndex];
            result[randomIndex] = result[i];
            result[i] = itemAtIndex;
        }

        return result;
    }

    private getRandomIndex(items: any[]): number {
        return Math.floor(Math.random() * items.length);
    }

    onShuffle(): Object[] {
        let input = this.shuffle(this._participants);
        input = this.pairParticipants(input);
        return input;
    }

    private handleError(error: Response) {
        return Observable.throw(error || 'Server error');
    }

}
