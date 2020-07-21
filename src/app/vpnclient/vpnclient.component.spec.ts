import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpnclientComponent } from './vpnclient.component';

describe('VpnclientComponent', () => {
  let component: VpnclientComponent;
  let fixture: ComponentFixture<VpnclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpnclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpnclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
