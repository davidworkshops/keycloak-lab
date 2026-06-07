import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  template: `
    <section class="card">
      <p class="eyebrow">Ruta protegida</p>
      <h1>Perfil</h1>

      @if (loading()) {
        <p>Cargando perfil...</p>
      } @else if (error()) {
        <p class="error">{{ error() }}</p>
      } @else {
        <dl>
          <dt>Username</dt>
          <dd>{{ username() }}</dd>
          <dt>Email</dt>
          <dd>{{ email() || 'No disponible' }}</dd>
          <dt>Roles</dt>
          <dd>
            @if (roles.length) {
              <ul class="role-list">
                @for (role of roles; track role) {
                  <li>{{ role }}</li>
                }
              </ul>
            } @else {
              Sin roles
            }
          </dd>
          <dt>Token parcial</dt>
          <dd>
            <code class="token">{{ partialToken }}</code>
          </dd>
        </dl>
      }
    </section>
  `,
})
export class ProfileComponent implements OnInit {
  private readonly auth = inject(AuthService);

  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly username = signal('');
  protected readonly email = signal('');
  protected readonly roles = this.auth.roles;

  protected get partialToken(): string {
    const token = this.auth.token;
    return token.length > 70 ? `${token.slice(0, 45)}...${token.slice(-20)}` : token;
  }

  async ngOnInit(): Promise<void> {
    try {
      const profile = await this.auth.loadProfile();
      this.username.set(profile.username ?? '');
      this.email.set(profile.email ?? '');
    } catch {
      this.error.set('No se pudo cargar el perfil desde Keycloak.');
    } finally {
      this.loading.set(false);
    }
  }
}
