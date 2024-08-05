import { Component } from '@angular/core';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quiz-app';
  loading$ = this.loaderService.loading$;

  constructor(private loaderService: LoaderService) {}

}
