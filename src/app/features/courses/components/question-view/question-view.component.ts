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
    questionText: string;
    explanation: string;
    difficulty: string;
    questionType: string;
    options: {optionText:string,isCorrect:boolean}[];
  };

  constructor(){
    this.question = 
    // {
    //   questionText: "what is your name?",
    //   explanation: "name given to identify you",
    //   difficulty: "Easy",
    //   questionType: "multipleChoice",
    //   options: ["1","2","3","4"]
    // };
    // {
    //   questionText: "what is your name?",
    //   explanation: "name given to identify you",
    //   difficulty: "Easy",
    //   questionType: "multiSelect",
    //   options: ["1","2","3","4"]
    // };
    {
      questionText: "what is your name?",
      explanation: "name given to identify you",
      difficulty: "Easy",
      questionType: "trueFalse",
      options: [{optionText:"asd",isCorrect:false}]
    };
  }
}
