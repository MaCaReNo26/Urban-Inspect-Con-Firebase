import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

import { firebaseAuth } from './firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registrar(email: string, password: string) {
    return createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
  }

  iniciarSesion(email: string, password: string) {
    return signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
  }

  cerrarSesion() {
    return signOut(firebaseAuth);
  }

  obtenerUsuario(): User | null {
    return firebaseAuth.currentUser;
  }

  verificarSesion(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        firebaseAuth,
        (user) => {
          unsubscribe();
          resolve(user);
        },
        (error) => {
          unsubscribe();
          reject(error);
        }
      );
    });
  }
}