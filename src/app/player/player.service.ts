import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, from } from 'rxjs';
import { HttpErrorService } from '../utils/http-error.service';
import { PlayerStats } from '../shared/interfaces';

@Injectable({
    providedIn: 'root',
})
export class PlayerService {
    
    selectedPlayer$ = new Subject<PlayerStats>();
    
    constructor() { }


    private requestUrl$ = new BehaviorSubject<string>(`?sort=name&order=asc&limit=25&offset=0`);
    
    dragonSelected = signal<boolean>(true);
    plantSelected = signal<boolean>(true);
    demonSelected = signal<boolean>(true);
    gnomeSelected = signal<boolean>(true);
    koboldSelected = signal<boolean>(true);
    undeadSelected = signal<boolean>(true);
    trollSelected = signal<boolean>(true);
    filterString = signal<string>('');
    toggleRaceFilter(raceVal: string) {
        switch (raceVal) {
            case 'dragon':
                this.dragonSelected.set(!this.dragonSelected());
                break;
            case 'plant':
                this.plantSelected.set(!this.plantSelected());
                break;
            case 'demon':
                this.demonSelected.set(!this.demonSelected());
                break;
            case 'gnome':
                this.gnomeSelected.set(!this.gnomeSelected());
                break;
            case 'kobold':
                this.koboldSelected.set(!this.koboldSelected());
                break;
            case 'undead':
                this.undeadSelected.set(!this.undeadSelected());
                break;
            case 'troll':
                this.trollSelected.set(!this.trollSelected());
                break;
        }
        this.getFilters();
    }

    getFilters() {
        const filters = (this.dragonSelected() ? 'dragon,' : '') + 
        (this.plantSelected() ? 'plant,' : '') + 
        (this.demonSelected() ? 'demon,' : '') + 
        (this.gnomeSelected() ? 'gnome,' : '') + 
        (this.koboldSelected() ? 'kobold,' : '') + 
        (this.undeadSelected() ? 'undead,' : '') + 
        (this.trollSelected() ? 'troll,' : '');
        this.filterString.set(filters.slice(0, -1));
    }
    
        
}
