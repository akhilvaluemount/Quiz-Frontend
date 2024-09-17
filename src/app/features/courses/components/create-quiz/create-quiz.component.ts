import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Location } from '@angular/common';
import { HierarchyService } from '../../services/hierarchy.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent {
  quizForm: FormGroup;
  selectQuestionIndex:number = 0;

  @ViewChildren('questionElement') questionElements!: QueryList<ElementRef>;


  constructor(private fb: FormBuilder,
              private location:Location, 
              private _quizService:QuizService,
              private _hierarchyService:HierarchyService) {
                
    this.quizForm = this.fb.group({
      title: [''],
      description: [''],
      creator: [''],
      duration: [30, Validators.min(0)],
      tags: this.fb.array(['angular', 'architecture', 'data binding', 'interpolation']),
      isPublished: [false],
      publishedAt: [''],
      visibility: ['private'],
      organizationId: [''],
      branchId: [''],
      courseId: [''],
      moduleId: [''],
      chapterId: [''],
      topicId: [''],
      questions: this.fb.array([]),
    });

    _hierarchyService.getHierachy().subscribe(
      (hierarchy:any)=>{
        this.quizForm.get('organizationId')?.patchValue(hierarchy.organization._id);
        this.quizForm.get('branchId')?.patchValue(hierarchy.branch._id);
        this.quizForm.get('courseId')?.patchValue(hierarchy.course._id);
        this.quizForm.get('moduleId')?.patchValue(hierarchy.module._id);
        this.quizForm.get('chapterId')?.patchValue(hierarchy.chapter._id);
        this.quizForm.get('topicId')?.patchValue(hierarchy.topic._id);
      }
    )
  }

  ngOnInit(): void {
    this.addQuestion();
    this.addQuestion();
    this.addQuestion();
    this.addQuestion();
    this.addQuestion();
    this.addQuestion();
    this.addQuestion();
    this.addQuestion();
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(this.fb.control(''));
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
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

  selectQuestion(i:number){
    console.log(i);
    this.selectQuestionIndex = i;
  }

  onSubmit(): void {
    // alert('submit'+this.quizForm.valid);
    if (true) {
      const quizData: any = this.quizForm.value;

      quizData.questions = quizData.questions.map((question:any)=>question.questionId);

      console.log('Form submitted with data:', quizData);


      // Call your service to save the quizData
      this._quizService.createQuiz(quizData).subscribe(
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

  scroll(index: any){
    const questionElement = this.questionElements.toArray()[index];
    questionElement.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
  }


}
