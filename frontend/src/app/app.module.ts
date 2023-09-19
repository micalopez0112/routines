import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRoutineComponent } from './components/addRoutine/add-routine/add-routine.component';
import { MyRoutinesComponent } from './components/myRoutines/my-routines/my-routines.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService } from './services/translation/translation.service';

@NgModule({
  declarations: [AppComponent, AddRoutineComponent, MyRoutinesComponent],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, FormsModule],
  providers: [TranslationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
