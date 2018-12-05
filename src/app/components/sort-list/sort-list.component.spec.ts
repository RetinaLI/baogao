import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortListComponent } from './sort-list.component';
import { UnitPipe } from 'src/app/pipes/unit.pipe';

describe('SortListComponent', () => {
  let component: SortListComponent;
  let fixture: ComponentFixture<SortListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortListComponent, UnitPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
