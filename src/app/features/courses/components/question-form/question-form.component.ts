import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { QuestionsService } from '../../services/questions.service';
import { HierarchyService } from '../../services/hierarchy.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuestionFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuestionFormComponent),
      multi: true,
    },
  ],
})
export class QuestionFormComponent implements ControlValueAccessor, Validator {

  // ==============CVA===============

  public onTouched!: () => {};

  writeValue(val: any): void {
    val && this.questionForm.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    console.log('on change');
    this.questionForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    console.log('on blur');
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.questionForm.disable({ emitEvent: false })
      : this.questionForm.enable({ emitEvent: false });
  }

  validate(c: AbstractControl): ValidationErrors | null {
    console.log('Basic Info validation', c);
    return this.questionForm.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: 'questionForm fields are invalid',
          },
        };
  }

  // ===============CVA================

  @Output() questionSubmit: EventEmitter<any> = new EventEmitter();
  questionForm: FormGroup;

  @Input() question:any = {};

  questionTypes = [
    { value: 'multipleChoice', display: 'Multiple Choice' },
    { value: 'multiSelect', display: 'Multi Select' },
    { value: 'trueFalse', display: 'True/False' }
  ];

  difficulties = ['easy', 'medium', 'hard'];

  constructor(private fb: FormBuilder, 
              private _hierarchyService:HierarchyService,
              private _questionsService: QuestionsService) {

    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      explanation: [''],
      difficulty: ['medium', Validators.required],
      questionType: ['multipleChoice', Validators.required],
      marks: ['',Validators.required],
      options: this.fb.array([]),
      organizationId: [''],
      branchId: [''],
      courseId: [''],
      moduleId: [''],
      chapterId: [''],
      topicId: [''],
      questionId: ['']
    });

    this.questionForm.get('questionType')?.valueChanges.subscribe(type => {
      this.setOptions(type);
    });

    this.setOptions('multipleChoice')

    _hierarchyService.getHierachy().subscribe(
      (hierarchy:any)=>{
        this.questionForm.get('organizationId')?.patchValue(hierarchy.organization._id);
        this.questionForm.get('branchId')?.patchValue(hierarchy.branch._id);
        this.questionForm.get('courseId')?.patchValue(hierarchy.course._id);
        this.questionForm.get('moduleId')?.patchValue(hierarchy.module._id);
        this.questionForm.get('chapterId')?.patchValue(hierarchy.chapter._id);
        this.questionForm.get('topicId')?.patchValue(hierarchy.topic._id);
      });

  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  setOptions(type: string) {
    const optionsControl = this.questionForm.get('options') as FormArray;
    while (optionsControl.length !== 0) {
      optionsControl.removeAt(0);
    }

    if (type === 'multipleChoice' || type === 'multiSelect') {
      for (let i = 0; i < 4; i++) {
        optionsControl.push(this.fb.group({
          text: ['', Validators.required],
          isCorrect: false
        }));
      }
    }

    if (type === 'trueFalse') {
      optionsControl.push(this.fb.group({
        text: 'True',
        isCorrect: false
      }));
      optionsControl.push(this.fb.group({
        text: 'False',
        isCorrect: false
      }));
    }
  }

  addOption() {
    if (this.questionForm.get('questionType')?.value !== 'trueFalse') {
      this.options.push(this.fb.group({
        text: ['', Validators.required],
        isCorrect: false
      }));
    }
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  submit() {
    
    // console.log(this.questionForm.value);
    this._questionsService.createQuestions(this.questionForm.value).subscribe(
      (question:any)=>{
        this.questionForm.get('questionId')?.patchValue(question._id);
        this.question = question;
        this.questionSubmit.emit();
        alert("Question Created Successfully!");
      },
      (error:any)=>{
        alert("question Creation Failed");
      });
  }

  selectOnlyOneCorrect(index: number) {
    if (this.questionForm.get('questionType')?.value === 'multipleChoice' ||
        this.questionForm.get('questionType')?.value === 'trueFalse') {
      this.options.controls.forEach((group, i) => {
        if (i !== index) {
          group.get('isCorrect')?.setValue(false);
        }
      });
    }
  }

}



