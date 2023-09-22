import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslationService } from './services/translation/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-routine';

  constructor() {}
}
