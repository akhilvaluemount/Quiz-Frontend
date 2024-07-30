import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewOrganizationsComponent } from './components/view-organizations/view-organizations.component';
import { CreateOrganizationComponent } from './components/create-organization/create-organization.component';

const routes: Routes = [
  {path:'create',component:CreateOrganizationComponent},
  {path:'view',component:ViewOrganizationsComponent},
  {path:'',component:ViewOrganizationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
