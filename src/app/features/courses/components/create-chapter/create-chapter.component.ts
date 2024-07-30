import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChapterService } from '../../services/chapter.service';

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss']
})
export class CreateChapterComponent {

  chapterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private chapterService: ChapterService,
    private location: Location
  ) {

    this.chapterForm = this.formBuilder.group({
      name: ['', Validators.required],
      moduleId: ['', Validators.required]
    });

   }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    if (this.chapterForm.valid) {
      this.chapterService.createChapter(this.chapterForm.value)
        .subscribe(
          (data:any) => {
            // Handle success, navigate or show message
            alert('chapter Created!!!');
          }, (error:any) => {
            console.error('Error creating chapter:', error);
            // Handle error
          });
    }
  }


  viewChapter(){
    this.location.back();
  }

}
