import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TopicService } from '../../services/topic.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent {
  chapterId:string=""
  topicForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _topicService: TopicService,
    private location: Location,
    private _activatedRoute: ActivatedRoute
  ) {

    this._activatedRoute.params.subscribe((params: any) => {
      this.chapterId = params.chapterId;
      console.log(this.chapterId)
    });
    
    this.topicForm = this.formBuilder.group({
      name: ['', Validators.required],
      chapterId: [{value: this.chapterId, disabled: true }, Validators.required]
    });

   }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    if (this.topicForm.valid) {
      this._topicService.createTopic(this.topicForm.value)
        .subscribe(
          (data:any) => {
            // Handle success, navigate or show message
            alert('Topic Created!!!');
          }, (error:any) => {
            console.error('Error creating Topic:', error);
            // Handle error
          });
    }
  }


  viewTopics(){
    this.location.back();
  }

}
