import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-topic',
  templateUrl: './view-topic.component.html',
  styleUrls: ['./view-topic.component.scss']
})
export class ViewTopicComponent {

  public topicID:any = "";

  constructor(private _activatedRoute:ActivatedRoute){
    _activatedRoute.params.subscribe(
      (params:any)=>{
        this.topicID = params.topicID;
      }
    )
  }

}
