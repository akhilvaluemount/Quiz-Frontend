import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../../services/organization.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent {
  organizationForm: FormGroup;

  constructor(private fb: FormBuilder, private _organizationService: OrganizationService, private _location:Location) {
    this.organizationForm = this.fb.group({
      name: ['', Validators.required],
      logo: [''],
      address: this.fb.group({
        building: [''],
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        postalCode: ['']
      }),
      contact: this.fb.group({
        phone: [''],
        email: ['', Validators.email],
        website: [''],
        facebook: [''],
        instagram: [''],
        linkedin: [''],
        twitterX: ['']
      }),
      type: ['institute']
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.organizationForm.valid) {
      console.log(this.organizationForm.value);
      this._organizationService.createOrganization(this.organizationForm.value).subscribe(
        (data: any) => {
          alert('created successfully');
        },
        (err: any) => {
          alert('internal server error');
        }
      )
    } else {
      console.log('Form is invalid');
      console.log(this.organizationForm);
    }
  }

  viewCorganzations() {
    this._location.back();
  }

}
