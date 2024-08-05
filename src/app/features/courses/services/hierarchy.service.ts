import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Course } from './course.service';
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

  private subject$: BehaviorSubject<any>= new BehaviorSubject(this.hierarchy);
  constructor( ) { 
  }

  getHierachy(){
    return this.subject$;
  }
  
  setCourse(course:any){
    this.hierarchy.course = course;
    this.subject$.next(this.hierarchy);
  }

  setModule(module:any){
    this.hierarchy.module = module;
    this.subject$.next(this.hierarchy);
  }

  setChapter(chapter:any){
    this.hierarchy.chapter = chapter;
    this.subject$.next(this.hierarchy);
  }

  st(){}






}
