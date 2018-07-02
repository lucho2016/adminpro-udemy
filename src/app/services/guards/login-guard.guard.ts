import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
      public _usuariosService: UsuarioService,
      public router: Router
     ) {}

  canActivate() {

    if ( this._usuariosService.estaLogueado() ) {
      return true;
    } else {
      console.log('Bloqueado por guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
