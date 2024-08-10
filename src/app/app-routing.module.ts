import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './features/auth/auth.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'/auth/login', pathMatch:'full'},
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m=>AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m=>DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
