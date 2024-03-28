import { KeyValuePipe, AsyncPipe, NgForOf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { ColorSchemeMapping } from './interfaces';
import { ColorService } from './color.service';

@Component({
  selector: 'app-color-scheme-selector',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, AsyncPipe, KeyValuePipe, NgForOf
  ],
  template: `<mat-form-field appearance="fill">
  <mat-label>Choose a Color Scheme</mat-label>
  <mat-select 
    (ngModelChange)="onSelected($event)" 
    [ngModel]="selectedColor$ | async">
    <mat-option *ngFor="let scheme of schemeOptions" [value]="scheme">{{ scheme }}</mat-option>
</mat-select>
</mat-form-field>`


})
export class ColorSchemeSelectorComponent {
  selectedColorScheme: any;
  public schemeOptions = ['air', 'aqua', 'fire', 'natural', 'cool', 'vivid', 'solar', 'flame', 'ocean', 'forest', 'horizon', 'neons', 'picnic', 'night', 'nightLights'];
  public ColorSchemeMapping = ColorSchemeMapping;
  private colorService = inject(ColorService);
  onSelected(event: MatSelectChange) {
    const selectedValue = event;
    this.colorService.colorSelected(selectedValue.toString());
  }
  readonly selectedColor$ = this.colorService.colorSelected$;
 
  enumToArray(enumObject): string[] {
    return Object.keys(enumObject)
      .map(key => enumObject[key]);
  }
}
