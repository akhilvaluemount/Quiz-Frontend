import { Component } from '@angular/core';
import { Chapter } from '../../services/chapter.service';
import { ActivatedRoute } from '@angular/router';
import { Topic, TopicService } from '../../services/topic.service';
import { HierarchyService } from '../../services/hierarchy.service';

@Component({
  selector: 'app-view-topics',
  templateUrl: './view-topics.component.html',
  styleUrls: ['./view-topics.component.scss']
})
export class ViewTopicsComponent {
  topics: Topic[] = [];
  chapterID:string = "";
  selectChapter:any;

  constructor(private _topicService: TopicService,
              private _hierarchyService:HierarchyService,
              private _activatedRoute: ActivatedRoute) {

    _activatedRoute.params.subscribe(
      (params: any) => {
        this.chapterID = params.chapterID;

        this._topicService.getTopicsByChapterId(this.chapterID)
          .subscribe(
            (topics: any) => {
              this.topics = topics;
            }, (error: any) => {
              console.error('Error fetching topics:', error);
              // Handle error
            });

      }
    )
    _hierarchyService.getHierachy().subscribe(
      (hierarchy:any)=>{
        this.selectChapter = hierarchy.chapter;
      },
      (error:any)=>{
        alert("Selected Chapter Not Found");
      }
    )
  }

  ngOnInit(): void {
  }
}
