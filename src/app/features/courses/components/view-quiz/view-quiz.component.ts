import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss'],
})
export class ViewQuizComponent implements OnInit {

  quizViewForm:FormGroup = new FormGroup({
    questions: new FormArray([])
  });

  public quiz: any;
  public quizId: any;
  isFullscreen: boolean = false;
  isSubmitted: boolean = false;
  isQuizInactive: number = 0;
  private lastScreenActive: any;
  @ViewChildren('questionElement') questionElements!: QueryList<ElementRef>;

  get questionsFormArray(){
    return this.quizViewForm.get('questions') as FormArray;
  }

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _quizService: QuizService
  ) {

    this._activatedRoute.params.subscribe((params: any) => {
      this.quizId = params.quizId;
      this._quizService.getQuizById(this.quizId).subscribe((quiz: any) => {
        this.quiz = quiz;
        for(let question of quiz.questions){
          this.questionsFormArray.push(new FormControl(question));
        }
      });
    });

    this.quizViewForm.valueChanges.subscribe((data:any)=>{
      console.log("quiz view valuechanges",data);
    })

    document.addEventListener(
      'fullscreenchange',
      this.enterFullscreen.bind(this),
      false
    );
    document.addEventListener(
      'visibilitychange',
      this.handleVisibilityChange.bind(this),
      false
    );

  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.isQuizInactive += 1;
      if (this.isQuizInactive > 2 && !this.isSubmitted) {
        alert('submitted your quiz');
        this.submitQuiz();
      } else if (this.isQuizInactive <= 2 && !this.isSubmitted) {
        this.lastScreenActive = Date.now();
        alert(
          'detected suspcious activity, next screen shift will submit your quiz'
        );
      }
    } else {
      if (Date.now() - this.lastScreenActive >= 60000) {
        this.submitQuiz();
        alert('detected suspcious activity, your quiz submitted');
      }
    }
  }

  ngOnInit(): void {
    if (!document.fullscreenElement) {
      console.log('not full screen oninit');
      this.isFullscreen = false;
      this.enterFullscreen();
    } else {
      console.log('yes full screen oninit');

      this.isFullscreen = true;
    }
  }

  enterFullscreen() {
    if (!document.fullscreenElement) {
      console.log('i am not in isFullscreen enterfullscreen');
      this.isFullscreen = false;
      document.documentElement
        .requestFullscreen()
        .then(() => {
          this.isFullscreen = true;

          console.log('yes full screen enterfullscreen');
        })
        .catch(() => {
          console.log('error full screen enterfullscreen');
          this.isFullscreen = false;
        });
    } else {
      console.log('i am in isFullscreen enterfullscreen');
      this.isFullscreen = true;
    }
  }

  submitQuiz() {
    this.isFullscreen = false;
    this.isSubmitted = true;
  }

  scroll(index: any) {
    const questionElement = this.questionElements.toArray()[index];
    questionElement.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

}
