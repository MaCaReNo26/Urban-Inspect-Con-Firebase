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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage {

  email = '';
  password = '';
  confirmarPassword = '';
  mensaje = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async registrar() {

    this.mensaje = '';

    if (!this.email.trim() || !this.password || !this.confirmarPassword) {
      this.mensaje = 'Complete todos los campos.';
      return;
    }

    if (this.password.length < 6) {
      this.mensaje = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.password !== this.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden.';
      return;
    }

    this.cargando = true;

    try {

      await this.authService.registrar(
        this.email.trim(),
        this.password
      );

      await this.router.navigateByUrl('/tabs/tab1');

    } catch (error: any) {

      console.error(error);

      if (error.code === 'auth/email-already-in-use') {
        this.mensaje = 'Este correo ya está registrado.';
      } else if (error.code === 'auth/invalid-email') {
        this.mensaje = 'El correo electrónico no es válido.';
      } else if (error.code === 'auth/weak-password') {
        this.mensaje = 'La contraseña es demasiado débil.';
      } else {
        this.mensaje = 'No se pudo registrar el usuario.';
      }

    } finally {
      this.cargando = false;
    }
  }
}