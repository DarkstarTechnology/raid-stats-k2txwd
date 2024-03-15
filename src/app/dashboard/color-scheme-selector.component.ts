import { NgIf, KeyValuePipe, NgFor, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ColorScheme, ColorSchemeMapping } from '../shared/interfaces';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-color-scheme-selector',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, KeyValuePipe, NgForOf
  ],
  template: `<mat-form-field appearance="fill">
  <mat-label>Choose a Color Scheme</mat-label>
  <select matNativeControl (change)="onSelected($event)" [(ngModel)]="selectedColorScheme">
    <option *ngFor="let scheme of schemeOptions" [value]="scheme">{{ scheme }}</option>
  </select>
</mat-form-field>`
  
  
})
export class ColorSchemeSelectorComponent {
  selectedColorScheme: any;
  public schemeOptions = ['air', 'aqua', 'fire', 'earth'];
  public ColorSchemeMapping = ColorSchemeMapping;
  private dashboardService = inject(DashboardService);
  
  onSelected(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.dashboardService.colorSchemeSelected(selectedValue);
  }

  enumToArray(enumObject): string[] {
    return Object.keys(enumObject)
      .map(key => enumObject[key]);
  }
}
