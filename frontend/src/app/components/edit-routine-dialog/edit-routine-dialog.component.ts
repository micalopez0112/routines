import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Routine } from 'src/app/models/routine';
import { RoutinesService } from 'src/app/services/routines/routines.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-edit-routine-dialog',
  templateUrl: './edit-routine-dialog.component.html',
  styleUrls: ['./edit-routine-dialog.component.css'],
})
export class EditRoutineDialogComponent {
  routine: Routine; // Ajusta el tipo según tu estructura de datos para las rutinas

  constructor(
    public dialogRef: MatDialogRef<EditRoutineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translationService: TranslationService,
    private routinesService: RoutinesService
  ) {
    this.routine = data.routine;
    console.log(this.routine);
  }

  saveRoutine() {
    this.routinesService
      .updateRoutine(this.routine)
      .subscribe((updatedRoutine) => {
        console.log('Rutina actualizada:', updatedRoutine);
        this.dialogRef.close();
      });
  }

  discardChanges() {
    this.dialogRef.close();
  }
}
