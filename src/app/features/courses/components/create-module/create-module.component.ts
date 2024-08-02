import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from '../../services/module.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.scss'],
})
export class CreateModuleComponent {
  courseID: string = '';
  moduleForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _moduleService: ModuleService,
    private location: Location,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe((params: any) => {
      this.courseID = params.courseID;
    });
    this.moduleForm = this.formBuilder.group({
      name: ['', Validators.required],
      courseId: [{value: this.courseID, disabled: true }, Validators.required],
    });
   
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.moduleForm.valid) {
      this._moduleService.createModule(this.moduleForm.value).subscribe(
        (data: any) => {
          // Handle success, navigate or show message
          alert('Module Created!!!');
        },
        (error: any) => {
          console.error('Error creating module:', error);
          // Handle error
        }
      );
    }
  }

  viewModules() {
    this.location.back();
  }
}
