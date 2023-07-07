import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenpoComponent } from './openpo.component';

describe('OpenpoComponent', () => {
  let component: OpenpoComponent;
  let fixture: ComponentFixture<OpenpoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenpoComponent]
    });
    fixture = TestBed.createComponent(OpenpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
