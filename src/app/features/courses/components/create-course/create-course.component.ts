import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private location: Location
  ) {

    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      organization: ['', Validators.required]
    });

   }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.courseService.createCourse(this.courseForm.value)
        .subscribe(
          (data:any) => {
            // Handle success, navigate or show message
            alert('Course Created!!!');
          }, (error:any) => {
            console.error('Error creating course:', error);
            // Handle error
          });
    }
  }


  viewCourses(){
    this.location.back();
  }

}
