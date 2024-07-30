import { Component } from '@angular/core';
import { Chapter, ChapterService } from '../../services/chapter.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-chapters',
  templateUrl: './view-chapters.component.html',
  styleUrls: ['./view-chapters.component.scss']
})
export class ViewChaptersComponent {
  chapters: Chapter[] = [];

  constructor(private _chapterService: ChapterService, private _activatedRoute: ActivatedRoute) {

    _activatedRoute.params.subscribe(
      (params: any) => {

        this._chapterService.getChaptersByModuleId(params.id)
          .subscribe(
            (chapters: any) => {
              this.chapters = chapters;
            }, (error: any) => {
              console.error('Error fetching chapters:', error);
              // Handle error
            });

      }
    )

  }

  ngOnInit(): void {
  }
}
