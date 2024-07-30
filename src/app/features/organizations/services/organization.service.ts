import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class OrganizationService {

  private baseUrl = environment.baseUrl+'/organizations/';

  constructor(private _httpClient:HttpClient) { }

  getOrganizations(){
    return this._httpClient.get(this.baseUrl);
  }

  createOrganization(organization:any){
    return this._httpClient.post(this.baseUrl,organization);
  }

  deleteOrganization(id:any){
    return this._httpClient.delete(this.baseUrl+id);
  }

}
