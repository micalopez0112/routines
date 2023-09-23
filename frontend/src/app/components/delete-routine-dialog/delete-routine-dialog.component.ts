import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoutinesService } from 'src/app/services/routines/routines.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-delete-routine-dialog',
  templateUrl: './delete-routine-dialog.component.html',
  styleUrls: ['./delete-routine-dialog.component.css'],
})
export class DeleteRoutineDialogComponent {
  private routineId: string = '';
  constructor(
    public dialogRef: MatDialogRef<DeleteRoutineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translationService: TranslationService,
    private routinesService: RoutinesService
  ) {
    this.routineId = data.routineId;
    console.log(this.routineId);
  }

  deleteRoutineAsync() {
    this.dialogRef.close('deleted');
  }

  cancelDelete() {
    this.dialogRef.close();
  }
}
