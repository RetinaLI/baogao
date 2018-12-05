import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortComponent } from './sort.component';
import { SubPipe } from 'src/app/pipes/sub.pipe';
import { UnitPipe } from 'src/app/pipes/unit.pipe';

describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortComponent, SubPipe, UnitPipe ],
      imports: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
