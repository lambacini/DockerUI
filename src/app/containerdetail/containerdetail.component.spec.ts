import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerdetailComponent } from './containerdetail.component';

describe('ContainerdetailComponent', () => {
  let component: ContainerdetailComponent;
  let fixture: ComponentFixture<ContainerdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
