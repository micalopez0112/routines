import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoutineDialogComponent } from './delete-routine-dialog.component';

describe('DeleteRoutineDialogComponent', () => {
  let component: DeleteRoutineDialogComponent;
  let fixture: ComponentFixture<DeleteRoutineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRoutineDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRoutineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
