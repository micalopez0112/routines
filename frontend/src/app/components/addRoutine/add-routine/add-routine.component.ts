import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/excersice';
import { Routine } from 'src/app/models/routine';
import { Serie } from 'src/app/models/serie';
import { RoutinesService } from 'src/app/services/routines/routines.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrls: ['./add-routine.component.css'],
})
export class AddRoutineComponent implements OnInit {
  public routine: Routine = {
    _id: '',
    name: '',
    dateCreated: new Date(),
    dateUpdated: new Date(),
    series: [],
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private routinesService: RoutinesService,
    public translationService: TranslationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  series: Serie[] = [];

  addSeries() {
    const newSerie: Serie = {
      _id: '',
      exercises: [],
      repetitions: 0,
      completed: false,
    };
    this.series.push(newSerie);
  }

  addExercise(serieIndex: number) {
    const newExercise: Exercise = {
      _id: '',
      name: '',
      repetitions: 0,
      eachOne: false,
    };
    this.series[serieIndex].exercises.push(newExercise);
  }

  async addRoutineAsync() {
    try {
      const newRoutine: Routine = {
        _id: '',
        name: this.routine.name,
        dateCreated: new Date(),
        dateUpdated: new Date(),
        series: this.series,
      };

      if (newRoutine.name.length <= 0) {
        this.snackBar.open(
          this.translationService.getTranslation('enterName'),
          '',
          {
            panelClass: ['custom-error-snackbar'],
            duration: 5000,
          }
        );
      } else if (newRoutine.series.length <= 0) {
        this.snackBar.open(
          this.translationService.getTranslation('enterSeries'),
          '',
          {
            panelClass: ['custom-error-snackbar'],
            duration: 5000,
          }
        );
      } else {
        await this.routinesService.addRoutineAsync(newRoutine);

        this.snackBar.open(
          this.translationService.getTranslation('routineAddedSuccessfully'),
          '',
          {
            panelClass: ['custom-success-snackbar'], // Clase de estilo para el Snackbar
            duration: 5000, // Duración del Snackbar en milisegundos
          }
        );

        this.routine = {
          _id: '',
          name: '',
          dateCreated: new Date(),
          dateUpdated: new Date(),
          series: [],
        };
        this.series = [];
      }
    } catch (error) {
      // En caso de error, muestra un mensaje de error
      this.errorMessage = 'Error al agregar la rutina';
    } finally {
      // Cierra el mensaje emergente después de unos segundos
      setTimeout(() => {
        this.successMessage = null;
        this.errorMessage = null;
      }, 5000);
    }
  }

  toggleMode(exercise: Exercise) {
    exercise.eachOne = !exercise.eachOne;
  }

  deleteSeries(index: number) {
    this.series.splice(index, 1);
  }

  deleteExercise(serieIndex: number, exerciseIndex: number) {
    this.series[serieIndex].exercises.splice(exerciseIndex, 1);
  }
}
