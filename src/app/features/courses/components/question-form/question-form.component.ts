import { Component, forwardRef, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormGroup,
  FormControl,
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

  questionForm: FormGroup;

  questionTypes = [
    { value: 'multipleChoice', display: 'Multiple Choice' },
    { value: 'multiSelect', display: 'Multi Select' },
    { value: 'trueFalse', display: 'True/False' }
  ];

  difficulties = ['Easy', 'Medium', 'Hard'];

  constructor(private fb: FormBuilder, 
              private _hierarchyService:HierarchyService,
              private _questionsService: QuestionsService) {

    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      explanation: [''],
      dificulty: ['Medium', Validators.required],
      quetionType: ['multipleChoice', Validators.required],
      options: this.fb.array([]),
      organizationId: [''],
      branchId: [''],
      courseId: [''],
      moduleId: [''],
      chapterId: [''],
      topicId: ['']
    });

    this.questionForm.get('quetionType')?.valueChanges.subscribe(type => {
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
          optionText: ['', Validators.required],
          isCorrect: false
        }));
      }
    }

    if (type === 'trueFalse') {
      optionsControl.push(this.fb.group({
        optionText: 'True',
        isCorrect: false
      }));
      optionsControl.push(this.fb.group({
        optionText: 'False',
        isCorrect: false
      }));
    }
  }

  addOption() {
    if (this.questionForm.get('quetionType')?.value !== 'trueFalse') {
      this.options.push(this.fb.group({
        optionText: ['', Validators.required],
        isCorrect: false
      }));
    }
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  submit() {
    this._questionsService.createQuestions(this.questionForm.value).subscribe(
      (question:any)=>{
        alert("Question Created Successfully!");
      },
      (error:any)=>{
        alert("question Creation Failed");
      });
  }

  selectOnlyOneCorrect(index: number) {
    if (this.questionForm.get('quetionType')?.value === 'multipleChoice' ||
        this.questionForm.get('quetionType')?.value === 'trueFalse') {
      this.options.controls.forEach((group, i) => {
        if (i !== index) {
          group.get('isCorrect')?.setValue(false);
        }
      });
    }
  }

}



