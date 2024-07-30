import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Topic {
  _id?: string; // Optional if you include _id from MongoDB
  name: string;
  chapterId: string; // Assuming chapter ID as a string
}

@Injectable()
export class TopicService {

  private baseUrl = environment.baseUrl + '/topics'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Create a new topic
  createTopic(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(this.baseUrl, topic);
  }

  // Get all topics
  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.baseUrl);
  }

  // Get topics by chapter ID
  getTopicsByChapterId(chapterId: string): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.baseUrl}/${chapterId}`);
  }

  // Update a topic
  updateTopic(topicId: string, topic: Topic): Observable<Topic> {
    return this.http.put<Topic>(`${this.baseUrl}/${topicId}`, topic);
  }

  // Delete a topic
  deleteTopic(topicId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${topicId}`);
  }

}
