import { Injectable } from '@angular/core';
import { Routine } from 'src/app/models/routine';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from 'src/app/models/serie';

@Injectable({
  providedIn: 'root',
})
export class RoutinesService {
  constructor(private http: HttpClient) {}
  private URL = 'http://localhost:3000/api';

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

  getRoutinesAsync(): Observable<Routine[]> {
    return this.http.get<Routine[]>(this.URL + '/routines/get-routines');
  }

  deleteRoutine(routineId: string): Observable<Routine[]> {
    return this.http.delete<Routine[]>(
      this.URL + '/routines/delete-routine' + `/${routineId}`
    );
  }

  updateSerieAsync(serie: Serie): Observable<any> {
    // Realiza una solicitud PUT o POST al backend para actualizar la serie
    const url = this.URL + '/series/update-serie' + `/${serie._id}`; // Reemplaza con la URL real de tu API

    return this.http.put(url, { completed: serie.completed });
  }

  restartRoutine(routineId: string): Observable<Routine[]> {
    return this.http.post<Routine[]>(this.URL + '/routines/restart-routine', {
      routineId: routineId,
    });
  }
}
