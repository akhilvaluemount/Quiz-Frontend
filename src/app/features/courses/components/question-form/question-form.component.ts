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

  questionTypes = [
    { value: 'multipleChoice', display: 'Multiple Choice' },
    { value: 'multiSelect', display: 'Multi Select' },
    { value: 'trueFalse', display: 'True/False' }
  ];

  difficulties = ['Easy', 'Medium', 'Hard'];

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      explanation: [''],
      difficulty: ['Medium', Validators.required],
      questionType: ['multipleChoice', Validators.required],
      options: this.fb.array([])
    });

    this.questionForm.get('questionType')?.valueChanges.subscribe(type => {
      this.setOptions(type);
    });

    this.setOptions('multipleChoice')
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
    if (this.questionForm.get('questionType')?.value !== 'trueFalse') {
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
    this.questionSubmit.emit()
    console.log(this.questionForm.value);
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



