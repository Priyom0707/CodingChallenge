import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchItemComponent } from './launch-item.component';

describe('LaunchItemComponent', () => {
  let component: LaunchItemComponent;
  let fixture: ComponentFixture<LaunchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
