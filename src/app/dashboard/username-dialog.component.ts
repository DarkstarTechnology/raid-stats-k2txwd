import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-username-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatInput,
    MatFormFieldModule
  ],
  template:`
  <h2 mat-dialog-title>Enter your name</h2>
  <mat-dialog-content>
    <mat-form-field appearance="fill">
      <mat-label>Name</mat-label>
      <input matInput [(ngModel)]="userName">
    </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions >
    <button mat-button (click)="closeDialog()">Save</button>
  </mat-dialog-actions>
`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsernameDialogComponent { 
  userName = '';

  constructor() {}

  closeDialog() {
    // Do something
  }
}
