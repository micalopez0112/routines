import { Component, OnInit } from '@angular/core';
import { Routine } from 'src/app/models/routine';
import { Serie } from 'src/app/models/serie';
import { RoutinesService } from 'src/app/services/routines/routines.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { EditRoutineDialogComponent } from '../../edit-routine-dialog/edit-routine-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRoutineDialogComponent } from '../../delete-routine-dialog/delete-routine-dialog.component';

@Component({
  selector: 'app-my-routines',
  templateUrl: './my-routines.component.html',
  styleUrls: ['./my-routines.component.css'],
})
export class MyRoutinesComponent implements OnInit {
  public routines: Routine[] = [];
  public isLoading = false;
  constructor(
    private routinesService: RoutinesService,
    public translationService: TranslationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRoutinesAsync();
  }

  deleteRoutine(routineId: string) {
    const dialogRef = this.dialog.open(DeleteRoutineDialogComponent, {
      data: { routineId: routineId },
    });
    this.getRoutinesAsync();
  }

  getRoutinesAsync() {
    this.isLoading = true;
    this.routinesService.getRoutinesAsync().subscribe(
      (routines) => {
        this.routines = routines;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar las rutinas', error);
        this.isLoading = false;
      }
    );
  }

  updateCompletedStatus(serie: Serie): void {
    this.routinesService.updateSerieAsync(serie).subscribe(
      (response) => {},
      (error) => {
        console.error(error);
      }
    );
  }

  restartRoutine(routineId: string) {
    this.routinesService.restartRoutine(routineId).subscribe(() => {
      this.getRoutinesAsync();
    });
  }

  openEditDialog(routine: Routine) {
    const dialogRef = this.dialog.open(EditRoutineDialogComponent, {
      data: { routine: routine },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Diálogo cerrado con resultado: ${result}`);
    });
  }
}
