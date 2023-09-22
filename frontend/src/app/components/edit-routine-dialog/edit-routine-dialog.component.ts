import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-routine-dialog',
  templateUrl: './edit-routine-dialog.component.html',
  styleUrls: ['./edit-routine-dialog.component.css'],
})
export class EditRoutineDialogComponent {
  routine: any; // Ajusta el tipo según tu estructura de datos para las rutinas

  constructor(
    public dialogRef: MatDialogRef<EditRoutineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    // Inicializa la propiedad 'routine' con los datos proporcionados al diálogo
    this.routine = data.routine; // Asegúrate de que 'routine' coincide con la estructura de datos
  }

  saveRoutine() {
    // Implementa la lógica para guardar la rutina aquí
    // Puedes acceder a 'this.routine' para obtener los datos de la rutina
    // Luego, cierra el diálogo cuando se complete la operación
    this.dialogRef.close();
  }

  discardChanges() {
    // Implementa la lógica para descartar los cambios en la rutina aquí
    // Puedes acceder a 'this.routine' para obtener los datos de la rutina
    // Luego, cierra el diálogo cuando se complete la operación
    this.dialogRef.close();
  }
}
