import { Component, OnInit } from '@angular/core';
import { Course, CourseService } from '../../services/course.service';
import { HierarchyService } from '../../services/hierarchy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss'],
})
export class ViewCoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private _courseService: CourseService,
              private _hierarchyService:HierarchyService,
              private _router:Router) {

  }

  ngOnInit(): void {
    this._courseService.getCourses().subscribe(
      (courses: any) => {
        this.courses = courses;
      },
      (error: any) => {
        console.error('Error fetching courses:', error);
        // Handle error
      }
    );    
  }

  selectCourse(course:any){
    this._hierarchyService.setCourse(course);
    this._router.navigate(['/dashboard/courses/view-modules/'+course._id]);    
  }

}
