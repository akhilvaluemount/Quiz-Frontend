import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { ViewCoursesComponent } from './components/view-courses/view-courses.component';
import { CreateModuleComponent } from './components/create-module/create-module.component';
import { ViewModuleComponent } from './components/view-module/view-module.component';
import { CreateChapterComponent } from './components/create-chapter/create-chapter.component';
import { ViewChaptersComponent } from './components/view-chapters/view-chapters.component';
import { CreateTopicComponent } from './components/create-topic/create-topic.component';
import { ViewTopicsComponent } from './components/view-topics/view-topics.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { ViewQuizzesComponent } from './components/view-quizzes/view-quizzes.component';
import { ViewTopicComponent } from './components/view-topic/view-topic.component';

const routes: Routes = [
  { path: 'create-course', component: CreateCourseComponent },
  { path: 'view-courses', component: ViewCoursesComponent },
  { path: 'create-module/:courseId', component: CreateModuleComponent },
  { path: 'view-modules/:courseId', component: ViewModuleComponent },
  { path: 'create-chapter/:moduleId', component: CreateChapterComponent },
  { path: 'view-chapters/:moduleId', component: ViewChaptersComponent },
  { path: 'create-topic/:chapterId', component: CreateTopicComponent },
  { path: 'view-topics/:chapterId', component: ViewTopicsComponent },
  { path: 'view-topic/:topicId', component: ViewTopicComponent },  
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'view-quiz/:quizId', component: ViewQuizComponent },
  { path: 'view-quizzes', component: ViewQuizzesComponent },
  { path: '', component: ViewCoursesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
