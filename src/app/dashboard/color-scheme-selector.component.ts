import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-color-scheme-selector',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  template: `<mat-form-field appearance="fill">
  <mat-label>Choose a Color Scheme</mat-label>
  <select matNativeControl [formControl]="colorSchemeControl">
    <option *ngFor="let scheme of colorSchemes" [value]="scheme">{{ scheme }}</option>
  </select>
</mat-form-field>`,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSchemeSelectorComponent {
  @Input() scheme: string = '';
  @Output() schemeChange = new EventEmitter<string>();
  colorSchemeControl = new FormControl('');
  colorSchemes: string[] = [
    'vivid', 'natural', 'cool', 'fire', 'solar',
    'air', 'aqua', 'flame', 'ocean', 'forest',
    'horizon', 'neons', 'picnic', 'night', 'nightLights'
  ];

  constructor() {
    this.colorSchemeControl.valueChanges.subscribe(value => {
      this.scheme = value;
      this.schemeChange.emit(this.scheme);
    });
  }
}
