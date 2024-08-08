import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent {

  public quiz: any;
  public quizId: any;

  constructor(private _activatedRoute: ActivatedRoute, private _quizService:QuizService) {

    _activatedRoute.params.subscribe(
      (params: any) => {
        this.quizId = params.quizId;
        _quizService.getQuizById(this.quizId).subscribe(
          (quiz:any)=>{
            this.quiz = quiz;
          }
        )

      }
    )

  }

  submitQuiz(){
    alert("quiz sumit request recieved");
  }

}
