import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  
  private colorSelectedSubject = new BehaviorSubject<string>('cool');
  readonly colorSelected$ = this.colorSelectedSubject.asObservable();

  colorSelected(color: string) {
    this.colorSelectedSubject.next(color);
  }
}
