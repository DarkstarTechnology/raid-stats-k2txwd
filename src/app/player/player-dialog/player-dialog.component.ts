import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PlayerStats } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-player-dialog',
    templateUrl: './player-dialog.component.html',
    styleUrls: ['./player-dialog.component.scss'],
})
export class PlayerDialogComponent {
    loading = true; // Flag to indicate loading status
    playerStats$: Observable<PlayerStats>; // Observable to hold the fetched data
    imageKitBaseUrl = 'https://ik.imagekit.io/kotd/';

    constructor(@Inject(MAT_DIALOG_DATA) public playerStats: PlayerStats) {}

    getImageUrl(fileName: string): string {
        return `${this.imageKitBaseUrl}${fileName}.webp`;
    }
}
