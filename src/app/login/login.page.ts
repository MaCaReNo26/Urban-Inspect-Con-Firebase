import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle
} from '@ionic/angular';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonText,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
  ]
})
export class LoginPage {

  email = '';
  password = '';
  mensaje = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async iniciarSesion() {

    this.mensaje = '';

    if (!this.email.trim() || !this.password) {
      this.mensaje = 'Ingrese el correo y la contraseña.';
      return;
    }

    this.cargando = true;

    try {
      await this.authService.iniciarSesion(
        this.email.trim(),
        this.password
      );

      await this.router.navigateByUrl('/tabs/tab1');

    } catch (error: any) {

      console.error(error);

      if (error.code === 'auth/invalid-credential') {
        this.mensaje = 'Correo o contraseña incorrectos.';
      } else if (error.code === 'auth/invalid-email') {
        this.mensaje = 'El correo electrónico no es válido.';
      } else if (error.code === 'auth/too-many-requests') {
        this.mensaje = 'Demasiados intentos. Intente más tarde.';
      } else {
        this.mensaje = 'No se pudo iniciar sesión.';
      }

    } finally {
      this.cargando = false;
    }
  }
}