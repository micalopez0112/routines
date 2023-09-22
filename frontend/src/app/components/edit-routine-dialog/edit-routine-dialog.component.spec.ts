import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoutineDialogComponent } from './edit-routine-dialog.component';

describe('EditRoutineDialogComponent', () => {
  let component: EditRoutineDialogComponent;
  let fixture: ComponentFixture<EditRoutineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRoutineDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRoutineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
