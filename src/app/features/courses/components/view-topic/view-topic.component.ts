import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HierarchyService } from '../../services/hierarchy.service';

@Component({
  selector: 'app-view-topic',
  templateUrl: './view-topic.component.html',
  styleUrls: ['./view-topic.component.scss']
})
export class ViewTopicComponent {

  public topicID:any = "";
  public selectTopic:any="";

  constructor(private _activatedRoute:ActivatedRoute,
              private _hierarchyService:HierarchyService){
    _activatedRoute.params.subscribe(
      (params:any)=>{
        this.topicID = params.topicID;
      }
    )

    _hierarchyService.getHierachy().subscribe(
      (hierarchy:any)=>{
        this.selectTopic=hierarchy.topic;
      },
      (error:any)=>{
        alert("Selected Topic Not Found");
      }
    )
  }

}
