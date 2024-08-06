import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChapterService } from '../../services/chapter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss']
})
export class CreateChapterComponent {
  moduleId :string = ""
  chapterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private chapterService: ChapterService,
    private location: Location,
    private _activatedRoute: ActivatedRoute
  ) {
    _activatedRoute.params.subscribe((params: any) => {
      this.moduleId = params.moduleId;
    });

    this.chapterForm = this.formBuilder.group({
      name: ['', Validators.required],
      moduleId: [{value:this.moduleId,disabled:true}, Validators.required]
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
