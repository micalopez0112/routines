import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/excersice';
import { Routine } from 'src/app/models/routine';
import { Serie } from 'src/app/models/serie';
import { RoutinesService } from 'src/app/services/routines/routines.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

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

  constructor(
    private routinesService: RoutinesService,
    public translationService: TranslationService
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
    const newRoutine: Routine = {
      _id: '',
      name: this.routine.name,
      dateCreated: new Date(),
      dateUpdated: new Date(),
      series: this.series,
    };
    await this.routinesService.addRoutineAsync(newRoutine);
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
