import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChaptersComponent } from './view-chapters.component';

describe('ViewChaptersComponent', () => {
  let component: ViewChaptersComponent;
  let fixture: ComponentFixture<ViewChaptersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewChaptersComponent]
    });
    fixture = TestBed.createComponent(ViewChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
