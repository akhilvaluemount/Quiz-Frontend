import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableTextComponent),
      multi: true
    }
  ]
})
export class EditableTextComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder: string = 'Click to edit';
  @Input() tag: string = 'p'; // Default tag is <p>
  @Input() inputType: 'input' | 'textarea' = 'input'; // Default input type is 'input'
  
  isEditing: boolean = false;
  value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle disabling the component if needed
  }

  startEditing(): void {
    this.isEditing = true;
  }

  stopEditing(): void {
    this.isEditing = false;
    this.onChange(this.value);
    this.onTouched();
  }

  onBlur(): void {
    this.stopEditing();
  }
}
