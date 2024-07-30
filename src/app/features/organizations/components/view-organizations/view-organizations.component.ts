import { Component } from '@angular/core';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-view-organizations',
  templateUrl: './view-organizations.component.html',
  styleUrls: ['./view-organizations.component.scss']
})
export class ViewOrganizationsComponent{

  public organizations:any = [];

  constructor(private _organizationService:OrganizationService){

    _organizationService.getOrganizations().subscribe(
      (data:any)=>{
        this.organizations = data;
      }
    )
    
  }

  deleteOrganization(id:any){
    this._organizationService.deleteOrganization(id).subscribe(
      (data:any)=>{
        alert('deleted successfully');
      },
      (err:any)=>{
        alert('internal server error');
      }
    )
  }

  

}
