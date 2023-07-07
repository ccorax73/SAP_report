import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpensalesoComponent } from './opensaleso.component';

describe('OpensalesoComponent', () => {
  let component: OpensalesoComponent;
  let fixture: ComponentFixture<OpensalesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpensalesoComponent]
    });
    fixture = TestBed.createComponent(OpensalesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
