import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Module {
  _id?: string; // Optional if you include _id from MongoDB
  name: string;
  course: string; // Assuming organization Id as a string
}

@Injectable()
export class ModuleService {

  private baseUrl = environment.baseUrl+'/modules'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Create a new module
  createModule(module: Module): Observable<Module> {
    return this.http.post<Module>(this.baseUrl, module);
  }

  // Get all modules
  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.baseUrl);
  }

  // Get a single module by Id
  getModulesByCourseId(courseId: string): Observable<Module> {
    return this.http.get<Module>(`${this.baseUrl}/${courseId}`);
  }

  // Update a module
  updateModule(moduleId: string, module: Module): Observable<Module> {
    return this.http.put<Module>(`${this.baseUrl}/${moduleId}`, module);
  }

  // Delete a module
  deleteModule(moduleId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${moduleId}`);
  }


}
