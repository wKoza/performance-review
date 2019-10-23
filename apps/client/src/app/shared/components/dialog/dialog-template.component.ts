import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-template',
  templateUrl: './dialog-template.component.html'
})
export class DialogTemplateComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    data.noBtnTitle = data.noBtnTitle ? data.noBtnTitle : 'No';
    data.yesBtnTitle = data.yesBtnTitle ? data.yesBtnTitle : 'Yes';
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }
}
