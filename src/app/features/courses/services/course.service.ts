import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Course {
  _id?: string; // Optional if you include _id from MongoDB
  name: string;
  organization: string; // Assuming organization Id as a string
}

@Injectable()
export class CourseService {

  private baseUrl = environment.baseUrl + '/courses'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Create a new course
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, course);
  }

  // Get all courses
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  // Get a single course by Id
  getCourseById(courseId: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${courseId}`);
  }

  // Update a course
  updateCourse(courseId: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${courseId}`, course);
  }

  // Delete a course
  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${courseId}`);
  }
}
