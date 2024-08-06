import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// quiz.model.ts

@Injectable()
export class QuizService {

  private baseUrl = environment.baseUrl + '/quizzes'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Create a new quiz
  createQuiz(quiz: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, quiz);
  }

  // Get all quizzes
  getQuizzes(hierarchy:string, id:string): Observable<any[]> {

    let params = new HttpParams()
    .set('hierarchy', hierarchy)
    .set('id', id);

    return this.http.get<any[]>(this.baseUrl,{ params });
  }

  // Get a quiz by Id
  getQuizById(quizId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${quizId}`);
  }

  // Update a quiz
  updateQuiz(quizId: string, quiz: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${quizId}`, quiz);
  }

  // Delete a quiz
  deleteQuiz(quizId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${quizId}`);
  }

}
