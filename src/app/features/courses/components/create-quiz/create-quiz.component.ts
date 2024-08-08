import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent {
  quizForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private _quizService: QuizService
  ) {
    this.quizForm = this.fb.group({
      title: [''],
      description: [''],
      creator: [''],
      duration: [0, Validators.min(0)],
      tags: this.fb.array([]),
      isPublished: [false],
      publishedAt: [''],
      visibility: ['private'],
      organizationId: [''],
      courseId: [''],
      moduleId: [''],
      chapterId: [''],
      topicId: [''],
      questions: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(this.fb.control(''));
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  showQuestions: any[]=[]

  questionSubmt(index: number) {
    this.showQuestions.push(this.questions.at(index).value);
  }

  get tags(): FormArray {
    return this.quizForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.fb.control(''));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  onSubmit(): void {
    // alert('submit'+this.quizForm.valid);
    if (true) {
      const quizData: any = this.quizForm.value;
      console.log('Form submitted with data:', quizData);
      // Call your service to save the quizData
      this._quizService.createQuiz(this.quizForm.value).subscribe(
        (data: any) => {
          alert('quiz creation success');
        },
        (err: any) => {
          alert('quiz creation failed');
        }
      );
    } else {
      console.error('Form is invalid');
      // Handle invalid form submission
    }
  }

  viewQuizzes() {
    this.location.back();
  }
}
