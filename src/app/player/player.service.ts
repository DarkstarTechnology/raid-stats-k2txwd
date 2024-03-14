import { Injectable } from '@angular/core';
import { PlayerStats } from '../interfaces/dbschema';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpErrorService } from '../utils/http-error.service';

@Injectable({
    providedIn: 'root',
})
export class PlayerService {
    
    selectedPlayer$ = new Subject<PlayerStats>();
    
    constructor() { }


    private requestUrl$ = new BehaviorSubject<string>(`?sort=name&order=asc&limit=25&offset=0`);
    
   

    

    
        
}
