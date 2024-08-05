import { Component } from '@angular/core';
import { Module, ModuleService } from '../../services/module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HierarchyService } from '../../services/hierarchy.service';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss'],
})
export class ViewModuleComponent {
  courseID: string = '';
  modules: Module[] = [];
  selectedCourse:any;
  constructor(
    private _moduleService: ModuleService,
    private _hierarchyService: HierarchyService,
    private  router:Router,
    private _activatedRoute: ActivatedRoute
  ) {
    _activatedRoute.params.subscribe((params: any) => {
      this.courseID = params.courseID;
      console.log(this.courseID,"courseID")
      this._moduleService.getModulesByCourseId(this.courseID).subscribe(
        (modules: any) => {
          this.modules = modules;
        },
        (error: any) => {
          console.error('Error fetching modules:', error);
          // Handle error
        }
      );
    });
    _hierarchyService.getHierachy().subscribe(
      (selectedCourse:any)=>{
      this.selectedCourse=selectedCourse.course;      
    },
      (error:any)=>{
        alert("Selected Course Not Found");
      })
  }

  ngOnInit(): void {}

  selectedModule(module:any){
    const selectedModule= this._hierarchyService.setModule(module);
    this.router.navigate(['/dashboard/courses/view-chapters/'+module._id]);    
  }
}

