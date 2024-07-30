import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  quizzes = [
    { title: 'HTML Quiz', description: 'Basic math questions', date: new Date() },
    { title: 'CSS Quiz', description: 'Basic science questions', date: new Date() },
    { title: 'JavaScript Quiz', description: 'Historical facts and events', date: new Date() }
  ];

}
