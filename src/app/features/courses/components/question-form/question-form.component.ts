
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent {

  @Input() questionType: 'multiple-choice' | 'multi-select' | 'true-false'="multiple-choice";
  @Input() multiSelect: boolean = false;
  
  questionText: string = '';
  options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  required: boolean = false;

  addOption() {
    this.options.push(`Option ${this.options.length + 1}`);
  }

  addOtherOption() {
    this.options.push('Other');
  }

  removeOption(index: number) {
    if (this.options.length > 1) {
      this.options.splice(index, 1);
    }
  }

  toggleRequired() {
    this.required = !this.required;
  }
}
