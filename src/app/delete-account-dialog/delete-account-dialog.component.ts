import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-delete-account-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-account-dialog.component.html',
  styleUrl: './delete-account-dialog.component.scss'
})
export class DeleteAccountDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog){}

  confirmDelete(){}

  closeAll(){}

}