// question-view.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent {
  @Input()
  question!: {
    _id:string;
    questionText: string;
    explanation: string;
    difficulty: string;
    questionType: string;
    options: {optionText:string,isCorrect:boolean}[];
  };

  constructor(){}
}
