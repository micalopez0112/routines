import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public translationService: TranslationService) {}

  changeLanguage(language: string) {
    this.translationService.changeLanguage(language);
  }

  @ViewChild('navToggle') navToggle!: ElementRef;
  @ViewChild('navMenu') navMenu!: ElementRef;

  ngAfterViewInit() {
    const toggleButton = this.navToggle.nativeElement;
    const menu = this.navMenu.nativeElement;
    const navLinks = menu.querySelectorAll('.nav-link');

    toggleButton.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

    // Agregar manejador de clic para las opciones del menú
    navLinks.forEach((link: any) => {
      link.addEventListener('click', () => {
        this.closeMenu(); // Cierra el menú después de hacer clic en una opción
      });
    });
  }

  closeMenu() {
    const menu = this.navMenu.nativeElement;
    menu.classList.remove('active');
  }

  selectedLanguage: string = 'en'; // Inicialmente, el idioma seleccionado es español

  languages: any[] = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'Inglés' },
  ];

  onLanguageChange() {
    this.translationService.changeLanguage(this.selectedLanguage);
  }
}
