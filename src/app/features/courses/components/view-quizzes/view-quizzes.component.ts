import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss']
})
export class ViewQuizzesComponent {

  quizzes: any=[];

  constructor(private quizService: QuizService) { 
    this.fetchQuizzes();
  }

  ngOnInit(): void {
   
  }

  fetchQuizzes(): void {
    this.quizService.getQuizzes().subscribe(
      (quizzes) => {
        this.quizzes = quizzes;
      },
      (error) => {
        console.error('Error fetching quizzes:', error);
        // Handle error
      }
    );
  }

  deleteQuiz(id: string): void {
    this.quizService.deleteQuiz(id).subscribe(
      () => {
        console.log('Quiz deleted successfully');
        this.fetchQuizzes(); // Refresh the quiz list
      },
      (error) => {
        console.error('Error deleting quiz:', error);
        // Handle error
      }
    );
  }

}
