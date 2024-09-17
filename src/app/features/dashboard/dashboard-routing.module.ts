import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: 'student-home',
        loadChildren: () => import('../home/student-home/student-home.module').then(m => m.StudentHomeModule)
      },
      {
        path: 'organizations',
        loadChildren: () => import('../organizations/organizations.module').then(m => m.OrganizationsModule)
      },
      { path: 'courses', loadChildren: () => import('../courses/courses.module').then(m => m.CoursesModule) },
      { path: '', redirectTo: 'courses', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
