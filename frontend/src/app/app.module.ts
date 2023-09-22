import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRoutineComponent } from './components/addRoutine/add-routine/add-routine.component';
import { MyRoutinesComponent } from './components/myRoutines/my-routines/my-routines.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService } from './services/translation/translation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditRoutineDialogComponent } from './components/edit-routine-dialog/edit-routine-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    AddRoutineComponent,
    MyRoutinesComponent,
    NavbarComponent,
    EditRoutineDialogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [TranslationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
