import { Component, OnInit, Inject } from '@angular/core';
import { CLR_DIALOG_DATA } from 'projects/clr-dialog/src/lib/clr-dialog.service';
import { ClrDialogRef } from 'projects/clr-dialog/src/lib/clr-dialog-ref';

@Component({
  selector: 'app-demo-dialog',
  templateUrl: './demo-dialog.component.html',
  styleUrls: ['./demo-dialog.component.scss']
})
export class DemoDialogComponent {
  result = 'This is the result';
  content: string;

  constructor(@Inject(CLR_DIALOG_DATA) public data, public dialogRef: ClrDialogRef<DemoDialogComponent>) {
    this.content = data.content;
  }
}
