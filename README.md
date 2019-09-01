# ClrDialog

A quick & dirty copy of Angular Material's Dialog service for use with VmWare Clarity

## Usage

Import package:

``` npm i clr-dialog``` 

Add to app.module.ts:

```

import { ClrDialogModule } from 'clr-dialog'

@NgModule({
  declarations: [...],
  imports: [
    ...
    ClrDialogModule,
    ...
  ],
  providers: [...],
  bootstrap: [...],
  entryComponents: []  <-- Add your Dialogs/'Modals' here
})
export class AppModule { }

```

Create a new dialog (ng g c my-dialog)

TS:
```
export class MyDialogComponent {
  content: string; // Inject data from caller

  constructor(@Inject(CLR_DIALOG_DATA) public data, public dialogRef: ClrDialogRef<DemoDialogComponent>) {
    this.content = data.content;
  }

}
```

HTML:
```
<clr-modal [clrModalOpen]="true" [clrModalSize]="'sm'/'lg'/'xl'" [clrModalClosable]="bool" [clrModalStaticBackdrop]="bool">
    <h3 class="modal-title">I have a nice title</h3>
    <div class="modal-body">
        <p>But not much to say...</p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-outline" clrDialogClose>Cancel</button>
        <button type="button" class="btn btn-primary" [clrDialogClose]="'thisIsTheResult'">Ok</button>
    </div>
</clr-modal>
```

Open the dialog in any other component
```
  constructor(private _clrDialogService: ClrDialogService) { }

  openDialog() {
    const dialogRef = this._clrDialogService.open(DemoDialogComponent, { data: { content: this.dialogContent } });

    // Handle the dialog result
    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });
```