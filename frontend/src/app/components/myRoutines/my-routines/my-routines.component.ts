import { Component, OnInit } from '@angular/core';
import { Routine } from 'src/app/models/routine';
import { Serie } from 'src/app/models/serie';
import { RoutinesService } from 'src/app/services/routines/routines.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { EditRoutineDialogComponent } from '../../edit-routine-dialog/edit-routine-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRoutineDialogComponent } from '../../delete-routine-dialog/delete-routine-dialog.component';
import { Exercise } from 'src/app/models/excersice';

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
    this.isLoading = true;
    this.routinesService.getRoutinesAsync();
    this.routinesService.routines$.subscribe(
      (routines) => {
        this.routines = routines;
        console.log('component' + this.routines);
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  deleteRoutine(routineId: string) {
    const dialogRef = this.dialog.open(DeleteRoutineDialogComponent, {
      data: { routineId: routineId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deleted') {
        this.routinesService.deleteRoutine(routineId).subscribe(() => {
          this.routinesService.getRoutinesAsync();
        });
      }
    });
  }

  getRoutinesAsync() {
    this.isLoading = true;
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
      this.routinesService.getRoutinesAsync();
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

  getMode(exercise: Exercise): string {
    return exercise.eachOne == true
      ? this.translationService.getTranslation('eachOne')
      : this.translationService.getTranslation('inTotal');
  }
}
