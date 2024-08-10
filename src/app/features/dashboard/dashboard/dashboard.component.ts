import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HierarchyService } from '../../courses/services/hierarchy.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  logo:string = "";
 
  quizzes = [
    { title: 'HTML Quiz', description: 'Basic math questions', date: new Date() },
    { title: 'CSS Quiz', description: 'Basic science questions', date: new Date() },
    { title: 'JavaScript Quiz', description: 'Historical facts and events', date: new Date() }
  ];

  constructor(private _router:Router,private _hierarchyService:HierarchyService){
    _hierarchyService.getHierachy().subscribe( //getLogo method with subject #fix
      (data:any)=>{
        this.logo = data.organization.logo;
      }
    )
  }

  logout(){
    localStorage.removeItem('token');
    this._router.navigateByUrl("auth/login");
  }

}
