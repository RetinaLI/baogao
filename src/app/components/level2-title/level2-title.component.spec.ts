import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Level2TitleComponent } from './level2-title.component';

describe('Level2TitleComponent', () => {
  let component: Level2TitleComponent;
  let fixture: ComponentFixture<Level2TitleComponent>;
  let h1De;
  let h1El;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level2TitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level2TitleComponent);
    component = fixture.componentInstance;
    h1De =  fixture.debugElement.query(By.css('.h1'));
    h1El = h1De.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title null', () => {
    expect(h1El.textContent).toEqual('');
  });

  it('should display a title after change', () => {
    component.name = 'Test Title';
    fixture.detectChanges();
    expect(h1El.textContent).toContain('Test Title');
  });
});
