import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent() {
      return import('./home/home.component').then((m) => m.HomeComponent);
    },
    pathMatch: 'full',
  },
  {
    path: 'demo',
    loadComponent: () =>
      loadRemoteModule('mfe1', './Component').then((m) => m.AppComponent),
  },

  { path: '**', redirectTo: '' },
];
