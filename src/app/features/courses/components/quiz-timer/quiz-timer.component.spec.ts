import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizTimerComponent } from './quiz-timer.component';

describe('QuizTimerComponent', () => {
  let component: QuizTimerComponent;
  let fixture: ComponentFixture<QuizTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizTimerComponent]
    });
    fixture = TestBed.createComponent(QuizTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
