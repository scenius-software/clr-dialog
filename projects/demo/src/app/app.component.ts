import { Component } from '@angular/core';
import { ClrDialogService } from 'projects/clr-dialog/src/lib/clr-dialog.service';
import { DemoDialogComponent } from './demo-dialog/demo-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dialogResult: string;
  dialogContent = 'Lorem ipsum bla bla'

  constructor(private _clrDialogService: ClrDialogService) { }

  openDialog() {
    const dialogRef = this._clrDialogService.open(DemoDialogComponent, { data: { content: this.dialogContent } });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });
  }

}
