import { Component } from '@angular/core';
import { Module, ModuleService } from '../../services/module.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss'],
})
export class ViewModuleComponent {
  courseID: string = '';
  modules: Module[] = [];

  constructor(
    private _moduleService: ModuleService,
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
  }

  ngOnInit(): void {}
}
