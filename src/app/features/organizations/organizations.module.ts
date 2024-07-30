import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { CreateOrganizationComponent } from './components/create-organization/create-organization.component';
import { ViewOrganizationsComponent } from './components/view-organizations/view-organizations.component';
import { OrganizationService } from './services/organization.service';

@NgModule({
  declarations: [
    CreateOrganizationComponent,
    ViewOrganizationsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    OrganizationsRoutingModule
  ],
  providers:[
    OrganizationService
  ]
})
export class OrganizationsModule { }
