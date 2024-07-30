import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Chapter {
  _id?: string; // Optional if you include _id from MongoDB
  name: string;
  moduleId: string; // Assuming moduleId as a string
}

@Injectable()
export class ChapterService {
  private baseUrl = environment.baseUrl + '/chapters/'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Create a new chapter
  createChapter(chapter: Chapter): Observable<Chapter> {
    return this.http.post<Chapter>(this.baseUrl, chapter);
  }

  // Get all chapters
  getChapters(): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(this.baseUrl);
  }

  // Get chapters by module ID
  getChaptersByModuleId(moduleId: string): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${this.baseUrl}/${moduleId}`);
  }

  // Get a single chapter by ID
  getChapterById(chapterId: string): Observable<Chapter> {
    return this.http.get<Chapter>(`${this.baseUrl}/${chapterId}`);
  }

  // Update a chapter
  updateChapter(chapterId: string, chapter: Chapter): Observable<Chapter> {
    return this.http.put<Chapter>(`${this.baseUrl}/${chapterId}`, chapter);
  }

  // Delete a chapter
  deleteChapter(chapterId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${chapterId}`);
  }
}
