import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  imports: [RouterLink],
  template: `
    <section class="card">
      <p class="eyebrow">Acceso denegado</p>
      <h1>Falta el rol admin</h1>
      <p>La sesion es valida, pero el usuario no tiene el rol necesario.</p>
      <a class="button-link" routerLink="/public">Volver a la pagina publica</a>
    </section>
  `,
})
export class ForbiddenComponent {}
