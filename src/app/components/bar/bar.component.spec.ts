import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BarComponent } from './bar.component';
import { By } from '@angular/platform-browser';

describe('测试Bar-echart组件', () => {
  let component: BarComponent;
  let fixture: ComponentFixture<BarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
