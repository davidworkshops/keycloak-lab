import { Routes } from '@angular/router';
import { adminGuard, authGuard } from './auth/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PublicComponent } from './pages/public/public.component';

export const routes: Routes = [
  { path: 'public', component: PublicComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    data: { role: 'admin' },
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '', pathMatch: 'full', redirectTo: 'public' },
  { path: '**', redirectTo: 'public' },
];
