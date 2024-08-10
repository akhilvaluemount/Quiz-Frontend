import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {

  public hierarchy:any = {
    organization:{
      "address": {
          "building": "ViratPlaza",
          "street": "roand no 2",
          "city": "Hyderabad",
          "state": "Telangana",
          "country": "India",
          "postalCode": "500072"
      },
      "contact": {
          "phone": "9704655744",
          "email": "info.mohithit@gmail.com",
          "website": "https://mohithit.com/",
          "facebook": "a",
          "instagram": "a",
          "linkedin": "a",
          "twitterX": "a"
      },
      "_id": "66a913eb213add64e5061039",
      "name": "Mohith IT",
      // "logo": "https://mohithit.com/wp-content/uploads/2022/10/Mohith-IT-Final-Logo-2.png",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Logo_International_Maritime_Organization.png",
      "type": "institute",
      "updatedAt": [],
      "__v": 0
    },
    branch:{"_id":"MOHITH-IT-BRANCH-ID"},
    course:{},
    module:{},
    chapter:{},
    topic:{}
  };

  private hierarchySubject$: BehaviorSubject<any>= new BehaviorSubject(this.hierarchy);

  constructor( ) { 
  }

  getHierachy(){
    return this.hierarchySubject$;
  }
  
  setCourse(course:any){
    this.hierarchy.course = course;
    this.hierarchy.module = {};
    this.hierarchy.chapter = {};
    this.hierarchy.topic = {};
    this.hierarchySubject$.next(this.hierarchy);
  }

  setModule(module:any){
    this.hierarchy.module = module;
    this.hierarchy.chapter = {};
    this.hierarchy.topic = {};
    this.hierarchySubject$.next(this.hierarchy);
  }

  setChapter(chapter:any){
    this.hierarchy.chapter = chapter;
    this.hierarchy.topic = {};
    this.hierarchySubject$.next(this.hierarchy);
  }

  setTopic(topic:any){
    this.hierarchy.topic = topic;
    this.hierarchySubject$.next(this.hierarchy);
  }

}
