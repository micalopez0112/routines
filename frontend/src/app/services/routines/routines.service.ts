import { Injectable } from '@angular/core';
import { Routine } from 'src/app/models/routine';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Serie } from 'src/app/models/serie';

@Injectable({
  providedIn: 'root',
})
export class RoutinesService {
  constructor(private http: HttpClient) {}
  // private URL = 'https://routines-i83u.onrender.com/api';
  private URL = 'http://localhost:3000/api';

  private routines: Routine[] = [];
  private routinesSubject = new BehaviorSubject<Routine[]>([]);

  get routines$() {
    return this.routinesSubject.asObservable();
  }

  async addRoutineAsync(newRoutine: Routine) {
    try {
      this.http
        .post<any>(this.URL + '/routines/add-routine', newRoutine)
        .subscribe(
          (response) => {
            console.log('Solicitud exitosa:', response);
          },
          (error) => {
            console.error('Error en la solicitud:', error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  getRoutinesAsync() {
    let routines = this.http
      .get<Routine[]>(this.URL + '/routines/get-routines')
      .subscribe(
        (routines) => {
          this.routines = routines;
          this.updateRoutines();
        },
        (error) => {
          console.error('Error al cargar las rutinas', error);
        }
      );
    console.log(routines);
  }

  deleteRoutine(routineId: string): Observable<Routine[]> {
    return this.http
      .delete<Routine[]>(
        this.URL + '/routines/delete-routine' + `/${routineId}`
      )
      .pipe(tap(() => this.updateRoutines()));
  }

  private updateRoutines() {
    this.routinesSubject.next([...this.routines]);
  }

  updateSerieAsync(serie: Serie): Observable<any> {
    const url = this.URL + '/series/update-serie' + `/${serie._id}`; // Reemplaza con la URL real de tu API

    return this.http.put(url, { completed: serie.completed });
  }

  restartRoutine(routineId: string): Observable<Routine[]> {
    return this.http
      .post<Routine[]>(this.URL + '/routines/restart-routine', {
        routineId: routineId,
      })
      .pipe(tap(() => this.updateRoutines()));
  }

  updateRoutine(routine: Routine): Observable<any> {
    let routineId = routine._id;
    const url = this.URL + '/routines/update-routine/' + `${routineId}`; // Ajusta la URL según tu API
    return this.http.put(url, routine);
  }
}
