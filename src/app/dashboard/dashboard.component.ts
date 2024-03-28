import { Component, Input, inject, signal } from '@angular/core';
import { ColorService } from '../shared/color.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  {
    
    private colorService = inject(ColorService);
    
    readonly selectedColor$ = this.colorService.colorSelected$;
    onSelect(event) {
        console.log(event);
    }
    onActivate(data): void {
        console.log('Activate', JSON.parse(JSON.stringify(data)));
    }

    onDeactivate(data): void {
        console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }

    
}
