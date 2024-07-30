import { Component } from '@angular/core';
import { Chapter } from '../../services/chapter.service';
import { ActivatedRoute } from '@angular/router';
import { Topic, TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-view-topics',
  templateUrl: './view-topics.component.html',
  styleUrls: ['./view-topics.component.scss']
})
export class ViewTopicsComponent {
  topics: Topic[] = [];

  constructor(private _topicService: TopicService, private _activatedRoute: ActivatedRoute) {

    _activatedRoute.params.subscribe(
      (params: any) => {

        this._topicService.getTopicsByChapterId(params.id)
          .subscribe(
            (topics: any) => {
              this.topics = topics;
            }, (error: any) => {
              console.error('Error fetching topics:', error);
              // Handle error
            });

      }
    )

  }

  ngOnInit(): void {
  }
}
