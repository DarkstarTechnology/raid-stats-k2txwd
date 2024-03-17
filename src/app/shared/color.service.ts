import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  selectedColorScheme = signal<string>('aqua');

  constructor() { }
  colorSchemeSelected(colorScheme: string) {
    this.selectedColorScheme.set(colorScheme);
   
  }
}
