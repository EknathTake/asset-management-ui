import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAssignComponent } from './asset-assign.component';

describe('AssetAssignComponent', () => {
  let component: AssetAssignComponent;
  let fixture: ComponentFixture<AssetAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
