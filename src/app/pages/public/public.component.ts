import { Component } from '@angular/core';

@Component({
  selector: 'app-public',
  template: `
    <section class="card">
      <p class="eyebrow">Ruta publica</p>
      <h1>Laboratorio Angular + Keycloak</h1>
      <p>
        Esta pagina no requiere autenticacion. Usa la navegacion para probar una ruta protegida por
        login y otra protegida por el rol <code>admin</code>.
      </p>
    </section>
  `,
})
export class PublicComponent {}
