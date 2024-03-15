import { NgIf, KeyValuePipe, NgFor, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
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
  <mat-select (selectionChange)="onSelected($event)" [(ngModel)]="selectedColorScheme">
    <mat-option *ngFor="let scheme of schemeOptions" [value]="scheme">{{ scheme }}</mat-option>
</mat-select>
</mat-form-field>`
  
  
})
export class ColorSchemeSelectorComponent {
  selectedColorScheme: any;
  public schemeOptions = ['air', 'aqua', 'fire', 'natural', 'cool', 'vivid', 'solar', 'flame', 'ocean', 'forest', 'horizon', 'neons', 'picnic', 'night', 'nightLights'];
  public ColorSchemeMapping = ColorSchemeMapping;
  private dashboardService = inject(DashboardService);
  
  onSelected(event: MatSelectChange) {
    const selectedValue = event.value;
    this.dashboardService.colorSchemeSelected(selectedValue);
  }

  enumToArray(enumObject): string[] {
    return Object.keys(enumObject)
      .map(key => enumObject[key]);
  }
}
