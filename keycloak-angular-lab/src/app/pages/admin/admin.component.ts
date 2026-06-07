import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <section class="card">
      <p class="eyebrow">Ruta protegida por rol</p>
      <h1>Area de administracion</h1>
      <p>Solo los usuarios con el rol de realm o cliente <code>admin</code> pueden entrar.</p>
    </section>
  `,
})
export class AdminComponent {}
