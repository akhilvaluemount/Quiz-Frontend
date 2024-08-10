import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent implements OnInit {

  public quiz: any;
  public quizId: any;
  @ViewChildren('questionElement') questionElements!: QueryList<ElementRef>;

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

  ngOnInit(): void {
    alert("Triggering Full Screen"); //keep this till full screen issue fixed
    const element = document.documentElement;
    element.requestFullscreen();
  }

  submitQuiz(){
    alert("quiz submit request recieved");
  }

  scroll(index: any){
    const questionElement = this.questionElements.toArray()[index];
    questionElement.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

}
