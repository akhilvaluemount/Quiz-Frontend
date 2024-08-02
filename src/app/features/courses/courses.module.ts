import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { ViewCoursesComponent } from './components/view-courses/view-courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from './services/course.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateModuleComponent } from './components/create-module/create-module.component';
import { ViewModuleComponent } from './components/view-module/view-module.component';
import { ModuleService } from './services/module.service';
import { CreateChapterComponent } from './components/create-chapter/create-chapter.component';
import { ViewChaptersComponent } from './components/view-chapters/view-chapters.component';
import { ChapterService } from './services/chapter.service';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { ViewTopicsComponent } from './components/view-topics/view-topics.component';
import { TopicService } from './services/topic.service';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { QuizService } from './services/quiz.service';
import { ViewQuizzesComponent } from './components/view-quizzes/view-quizzes.component';
import { QuestionFormComponent } from './components/question-form-component/question-form.component';


@NgModule({
  declarations: [
    CreateCourseComponent,
    ViewCoursesComponent,
    CreateModuleComponent,
    ViewModuleComponent,
    CreateChapterComponent,
    ViewChaptersComponent,
    CreateTopicComponent,
    ViewTopicsComponent,
    CreateQuizComponent,
    ViewQuizComponent,
    ViewQuizzesComponent,
    QuestionFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoursesRoutingModule
  ],
  providers:[
    CourseService,
    ModuleService,
    ChapterService,
    TopicService,
    QuizService
  ]
})
export class CoursesModule { }
