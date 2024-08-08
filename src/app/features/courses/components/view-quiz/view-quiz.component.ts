import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent {

  public quiz: any = {
    "title": "Data-binding Quiz",
    "description": "Data-Binding",
    "creator": "Venkat",
    "duration": 1,
    "tags": [],
    "isPublished": false,
    "publishedAt": "",
    "visibility": "private",
    "organizationId": "66a913eb213add64e5061039",
    "branchId": "MOHITH-IT-BRANCH-ID",
    "courseId": "66a9144d213add64e5061042",
    "moduleId": "66a91486213add64e506104a",
    "chapterId": "66a914a9213add64e5061052",
    "questions": [
      {
        "questionText": "what is angular?",
        "explanation": "spa",
        "difficulty": "Medium",
        "questionType": "multipleChoice",
        "options": [
          {
            "optionText": "It is website",
            "isCorrect": false
          },
          {
            "optionText": "It is a framework to build single page application",
            "isCorrect": "true"
          },
          {
            "optionText": "It is a testing tool",
            "isCorrect": false
          },
          {
            "optionText": "it is used for backend ",
            "isCorrect": false
          }
        ],
        "organizationId": "66a913eb213add64e5061039",
        "branchId": "MOHITH-IT-BRANCH-ID",
        "courseId": "66a9144d213add64e5061042",
        "moduleId": "66a91486213add64e506104a",
        "chapterId": "66a914a9213add64e5061052"
      },
      {
        "questionText": "How many types of directives are there in angular?",
        "explanation": "3",
        "difficulty": "Medium",
        "questionType": "multipleChoice",
        "options": [
          {
            "optionText": "1",
            "isCorrect": false
          },
          {
            "optionText": "2",
            "isCorrect": false
          },
          {
            "optionText": "3",
            "isCorrect": "true"
          },
          {
            "optionText": "4",
            "isCorrect": false
          }
        ],
        "organizationId": "66a913eb213add64e5061039",
        "branchId": "MOHITH-IT-BRANCH-ID",
        "courseId": "66a9144d213add64e5061042",
        "moduleId": "66a91486213add64e506104a",
        "chapterId": "66a914a9213add64e5061052"
      },
      {
        "questionText": "async operations are provided by Rxjs Library in Angular",
        "explanation": "true",
        "difficulty": "Medium",
        "questionType": "trueFalse",
        "options": [
          {
            "optionText": "True",
            "isCorrect": true
          },
          {
            "optionText": "False",
            "isCorrect": false
          }
        ],
        "organizationId": "66a913eb213add64e5061039",
        "branchId": "MOHITH-IT-BRANCH-ID",
        "courseId": "66a9144d213add64e5061042",
        "moduleId": "66a91486213add64e506104a",
        "chapterId": "66a914a9213add64e5061052"
      },
      {
        "questionText": "how to create component using angular CLI? ",
        "explanation": "ng g c ",
        "difficulty": "Easy",
        "questionType": "multipleChoice",
        "options": [
          {
            "optionText": "ng g g componentName",
            "isCorrect": false
          },
          {
            "optionText": "ng g p ComponentName",
            "isCorrect": false
          },
          {
            "optionText": "ng g s ComponentName",
            "isCorrect": false
          },
          {
            "optionText": "ng g c componentName",
            "isCorrect": "true"
          }
        ],
        "organizationId": "66a913eb213add64e5061039",
        "branchId": "MOHITH-IT-BRANCH-ID",
        "courseId": "66a9144d213add64e5061042",
        "moduleId": "66a91486213add64e506104a",
        "chapterId": "66a914a9213add64e5061052"
      }
    ]
  };
  public quizId: any;

  constructor(private _activatedRoute: ActivatedRoute) {

    _activatedRoute.params.subscribe(
      (quizId: any) => {
        this.quizId = quizId;
      }
    )
  }

  submitQuiz(){
    alert("quiz sumit request recieved");
  }

}
