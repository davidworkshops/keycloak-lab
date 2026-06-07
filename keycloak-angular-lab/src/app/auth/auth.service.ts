import { Injectable, inject } from '@angular/core';
import Keycloak, { KeycloakProfile } from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly keycloak = inject(Keycloak);

  get authenticated(): boolean {
    return this.keycloak.authenticated === true;
  }

  get token(): string {
    return this.keycloak.token ?? '';
  }

  get roles(): string[] {
    const realmRoles = this.keycloak.realmAccess?.roles ?? [];
    const clientRoles = Object.entries(this.keycloak.resourceAccess ?? {}).flatMap(
      ([client, access]) => access.roles.map((role) => `${client}:${role}`),
    );

    return [...new Set([...realmRoles, ...clientRoles])].sort();
  }

  login(redirectPath = '/profile'): Promise<void> {
    return this.keycloak.login({
      redirectUri: `${window.location.origin}${redirectPath}`,
    });
  }

  logout(): Promise<void> {
    return this.keycloak.logout({
      redirectUri: `${window.location.origin}/public`,
    });
  }

  loadProfile(): Promise<KeycloakProfile> {
    return this.keycloak.loadUserProfile();
  }
}
