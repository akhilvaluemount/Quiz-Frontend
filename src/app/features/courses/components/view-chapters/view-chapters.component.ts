import { Component } from '@angular/core';
import { Chapter, ChapterService } from '../../services/chapter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HierarchyService } from '../../services/hierarchy.service';

@Component({
  selector: 'app-view-chapters',
  templateUrl: './view-chapters.component.html',
  styleUrls: ['./view-chapters.component.scss']
})
export class ViewChaptersComponent {
  moduleId:string=""
  chapters: Chapter[] = [];
  selectModule:any;
  constructor(private _chapterService: ChapterService,
              private _hierarchyService:HierarchyService,
              private _router:Router, 
              private _activatedRoute: ActivatedRoute) {

    _activatedRoute.params.subscribe(
      (params: any) => {
        this.moduleId=params.moduleId
        this._chapterService.getChaptersByModuleId(this.moduleId)
          .subscribe(
            (chapters: any) => {
              this.chapters = chapters;
            }, (error: any) => {
              console.error('Error fetching chapters:', error);
              // Handle error
            });

      }
    )
    _hierarchyService.getHierachy().subscribe(
      (hierarchy:any)=>{
        this.selectModule=hierarchy.module;        
    }),
      (error:any)=>{
        alert('Selected Module not Found');
      }
  }

  ngOnInit(): void {
  }
  selectChapter(chapter:any){
    this._hierarchyService.setChapter(chapter);
    this._router.navigate(['/dashboard/courses/view-topics/'+chapter._id]);
  }
}
