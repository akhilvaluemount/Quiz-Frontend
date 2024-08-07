import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class QuestionsService {

  private baseUrl = environment.baseUrl + '/questions'; 

  constructor(private http:HttpClient) { }

  createQuestions(questions:any): Observable<any>{
    return this.http.post<any[]>(this.baseUrl, questions);
  }
}
