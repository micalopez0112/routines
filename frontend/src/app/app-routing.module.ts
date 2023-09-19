import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRoutinesComponent } from './components/myRoutines/my-routines/my-routines.component';
import { AddRoutineComponent } from './components/addRoutine/add-routine/add-routine.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'myRoutines',
    pathMatch: 'full',
  },
  {
    path: 'myRoutines',
    component: MyRoutinesComponent,
  },
  {
    path: 'addRoutine',
    component: AddRoutineComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
