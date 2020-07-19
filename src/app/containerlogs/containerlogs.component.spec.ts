import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerlogsComponent } from './containerlogs.component';

describe('ContainerlogsComponent', () => {
  let component: ContainerlogsComponent;
  let fixture: ComponentFixture<ContainerlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
