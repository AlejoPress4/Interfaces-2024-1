import { ComponentFixture, TestBed } from '@angular/core/testing';

import {TabulatorTasksComponent} from './tabulator-task.component';

describe('TabulatorTaskComponent', () => {
  let component: TabulatorTasksComponent;
  let fixture: ComponentFixture<TabulatorTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabulatorTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabulatorTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
