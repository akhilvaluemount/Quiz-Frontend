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
    { value: 'multiple_choice', display: 'Multiple Choice' },
    { value: 'multi_select', display: 'Multi Select' },
    { value: 'true_false', display: 'True/False' }
  ];

  difficulties = ['Easy', 'Medium', 'Hard'];

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      explanation: ['', Validators.required],
      dificulty: ['', Validators.required],
      quetionType: ['', Validators.required],
      options: this.fb.array([])
    });

    this.questionForm.get('quetionType')?.valueChanges.subscribe(type => {
      this.setOptions(type);
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

    if (type === 'multiple_choice' || type === 'multi_select') {
      for (let i = 0; i < 4; i++) {
        optionsControl.push(this.fb.group({
          optionText: ['', Validators.required],
          isCorrect: false
        }));
      }
    }

    if (type === 'true_false') {
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
    if (this.questionForm.get('quetionType')?.value !== 'true_false') {
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
    console.log(this.questionForm.value);
  }

  selectOnlyOneCorrect(index: number) {
    if (this.questionForm.get('quetionType')?.value === 'multiple_choice' ||
        this.questionForm.get('quetionType')?.value === 'true_false') {
      this.options.controls.forEach((group, i) => {
        if (i !== index) {
          group.get('isCorrect')?.setValue(false);
        }
      });
    }
  }

}



