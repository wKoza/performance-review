import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '@perf-review/api-interfaces';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'
})
export class DialogComponent {
  // @Output() yesClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    data.noBtnTitle = data.noBtnTitle ? data.noBtnTitle : 'No';
    data.yesBtnTitle = data.yesBtnTitle ? data.yesBtnTitle : 'Yes';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close();
    // this.yesClicked.emit(true);
  }
}
