import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {

  public hierarchy:any = {
    course:{},
    module:{},
    chapter:{}
  };

  private hierarchySubject$: BehaviorSubject<any>= new BehaviorSubject(this.hierarchy);
  constructor( ) { 
  }

  getHierachy(){
    return this.hierarchySubject$;
  }
  
  setCourse(course:any){
    this.hierarchy.course = course;
    this.hierarchySubject$.next(this.hierarchy);
  }

  setModule(module:any){
    this.hierarchy.module = module;
    this.hierarchySubject$.next(this.hierarchy);
  }

  setChapter(chapter:any){
    this.hierarchy.chapter = chapter;
    this.hierarchySubject$.next(this.hierarchy);
  }
}
