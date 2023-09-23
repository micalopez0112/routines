import { Component, OnInit } from '@angular/core';
import { Routine } from 'src/app/models/routine';
import { Serie } from 'src/app/models/serie';
import { RoutinesService } from 'src/app/services/routines/routines.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { EditRoutineDialogComponent } from '../../edit-routine-dialog/edit-routine-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-routines',
  templateUrl: './my-routines.component.html',
  styleUrls: ['./my-routines.component.css'],
})
export class MyRoutinesComponent implements OnInit {
  public routines: Routine[] = [];
  constructor(
    private routinesService: RoutinesService,
    public translationService: TranslationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRoutinesAsync();
  }

  deleteRoutine(routineId: string) {
    if (confirm('Are you sure you want to delete this routine?')) {
      this.routinesService.deleteRoutine(routineId).subscribe(() => {
        this.getRoutinesAsync();
      });
    }
  }

  getRoutinesAsync() {
    this.routinesService.getRoutinesAsync().subscribe((routines) => {
      this.routines = routines;
      console.log(this.routines);
    });
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
