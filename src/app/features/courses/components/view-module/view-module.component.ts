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
  courseId: string = '';
  modules: Module[] = [];
  selectCourse:any;
  constructor(
    private _moduleService: ModuleService,
    private _hierarchyService: HierarchyService,
    private  _router:Router,
    private _activatedRoute: ActivatedRoute
  ) {
    _activatedRoute.params.subscribe((params: any) => {
      this.courseId = params.courseId;
      console.log(this.courseId,"courseId")
      this._moduleService.getModulesByCourseId(this.courseId).subscribe(
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
      (hierarchy:any)=>{
      this.selectCourse=hierarchy.course;      
    },
      (error:any)=>{
        alert("Selected Course Not Found");
      })
  }

  ngOnInit(): void {}

  selectModule(module:any){
    this._hierarchyService.setModule(module);
    this._router.navigate(['/dashboard/courses/view-chapters/'+module._id]);    
  }
}

