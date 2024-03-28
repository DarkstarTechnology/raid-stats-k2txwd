import { Injectable, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);
  
  registerIcons(): void {
    this.matIconRegistry.addSvgIcon(
      'dragon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/Dragon.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'demon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/Demon.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'gnome',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/Gnome.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'kobold',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/Kobold.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'plant',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/Plant.svg')
    );
    
    this.matIconRegistry.addSvgIcon(
      'undead',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/Undead.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'gnomes',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/gnomes.svg')
  
    );
  }
}
