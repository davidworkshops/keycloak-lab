import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

export const authGuard = createAuthGuard(async (_route, state, authData: AuthGuardData) => {
  if (authData.authenticated) {
    return true;
  }

  await authData.keycloak.login({
    redirectUri: `${window.location.origin}${state.url}`,
  });
  return false;
});

export const adminGuard = createAuthGuard(async (route, state, authData: AuthGuardData) => {
  if (!authData.authenticated) {
    await authData.keycloak.login({
      redirectUri: `${window.location.origin}${state.url}`,
    });
    return false;
  }

  const requiredRole = route.data['role'] as string;
  const hasRealmRole = authData.grantedRoles.realmRoles.includes(requiredRole);
  const hasClientRole =
    authData.grantedRoles.resourceRoles['angular-client']?.includes(requiredRole) ?? false;

  return hasRealmRole || hasClientRole || inject(Router).parseUrl('/forbidden');
});
