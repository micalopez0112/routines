import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage = 'en';
  private translations = new BehaviorSubject<any>({});

  constructor() {
    this.loadTranslations();
  }

  setLanguage(language: string) {
    this.currentLanguage = language;
    this.loadTranslations();
  }

  getTranslation(key: string) {
    return this.translations.value[key] || key;
  }

  private loadTranslations() {
    // Simula cargar las traducciones desde el archivo correspondiente
    const translations = require(`../../../assets/${this.currentLanguage}.json`);
    this.translations.next(translations);
  }

  changeLanguage(language: string) {
    this.setLanguage(language);
  }
}
