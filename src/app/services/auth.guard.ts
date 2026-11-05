import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const usuario = await authService.verificarSesion();

    if (usuario) {
      return true;
    }

    return router.createUrlTree(['/login']);

  } catch (error) {
    console.error('Error verificando sesión:', error);
    return router.createUrlTree(['/login']);
  }
};