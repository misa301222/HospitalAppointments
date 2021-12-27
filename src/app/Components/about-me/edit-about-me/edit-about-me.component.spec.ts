import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAboutMeComponent } from './edit-about-me.component';

describe('EditAboutMeComponent', () => {
  let component: EditAboutMeComponent;
  let fixture: ComponentFixture<EditAboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAboutMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
