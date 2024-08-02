import { Component, OnInit } from '@angular/core';
import { Course, CourseService } from '../../services/course.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.scss'],
})
export class ViewCoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      (courses: any) => {
        this.courses = courses;
      },
      (error: any) => {
        console.error('Error fetching courses:', error);
        // Handle error
      }
    );
    
  }
}
