import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAboutMeComponent } from './show-about-me.component';

describe('ShowAboutMeComponent', () => {
  let component: ShowAboutMeComponent;
  let fixture: ComponentFixture<ShowAboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAboutMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
