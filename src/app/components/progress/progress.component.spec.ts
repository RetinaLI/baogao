import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressComponent } from './progress.component';
import { ToNumberPipe } from 'src/app/pipes/to-number.pipe';
import { UnitPipe } from 'src/app/pipes/unit.pipe';
import {By} from '@angular/platform-browser';

describe('ProgressComponent-进度条组件', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressComponent, ToNumberPipe, UnitPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('progress-进度条组件：数据为空', () => {
    component._data = [];
    fixture.detectChanges();
    const $progress = fixture.debugElement.query(By.css('.progress-content'));

    expect($progress).toBeFalsy();
  });
  it('progress-进度条组件：只传入title和progress', () => {
    component._data = [{
      title: '欧曼',
      progress: '50',
    }];
    fixture.detectChanges();
    const $lift = fixture.debugElement.query(By.css('.progress-content .lift'));
    const $sort1 = fixture.debugElement.query(By.css('.progress-content .sort1'));
    const $sort2 = fixture.debugElement.query(By.css('.progress-content .sort2'));
    const $progressSec = fixture.debugElement.query(By.css('.progress-content .progress-sec-all'));

    expect($lift).toBeFalsy();
    expect($sort1).toBeFalsy();
    expect($sort2).toBeFalsy();
    expect($progressSec).toBeFalsy();
  });
  it('progress-进度条组件：增加sort排序', () => {
    component._data = [{
      title: '欧曼',
      progress: '50',
    }];
    component.sort = true;
    fixture.detectChanges();
    const $lift = fixture.debugElement.query(By.css('.progress-content .lift'));
    const $sort1 = fixture.debugElement.query(By.css('.progress-content .sort1'));
    const $sort2 = fixture.debugElement.query(By.css('.progress-content .sort2'));
    const $progressSec = fixture.debugElement.query(By.css('.progress-content .progress-sec-all'));

    expect($lift).toBeFalsy();
    expect($sort1).toBeTruthy();
    expect($sort2).toBeFalsy();
    expect($progressSec).toBeFalsy();
  });
  it('progress-进度条组件：增加sort排序前3名增加背景', () => {
    component._data = [{
      title: '欧曼',
      progress: '50',
    }];
    component.sort = true;
    component.sortLayout = true;
    fixture.detectChanges();
    const $lift = fixture.debugElement.query(By.css('.progress-content .lift'));
    const $sort1 = fixture.debugElement.query(By.css('.progress-content .sort1'));
    const $sort2 = fixture.debugElement.query(By.css('.progress-content .sort2'));
    const $progressSec = fixture.debugElement.query(By.css('.progress-content .progress-sec-all'));

    expect($lift).toBeFalsy();
    expect($sort2).toBeTruthy();
    expect($sort1).toBeFalsy();
    expect($progressSec).toBeFalsy();
  });
  it('progress-进度条组件：增加sort排序前3名增加背景,增加升降lift', () => {
    component._data = [{
      title: '欧曼',
      progress: '50',
      lift: '0'
    }];
    component.sort = true;
    component.sortLayout = true;
    fixture.detectChanges();
    const $lift = fixture.debugElement.query(By.css('.progress-content .lift'));
    const $sort1 = fixture.debugElement.query(By.css('.progress-content .sort1'));
    const $sort2 = fixture.debugElement.query(By.css('.progress-content .sort2'));
    const $progressSec = fixture.debugElement.query(By.css('.progress-content .progress-sec-all'));

    expect($lift).toBeTruthy();
    expect($sort2).toBeTruthy();
    expect($sort1).toBeFalsy();
    expect($progressSec).toBeFalsy();
  });
  it('progress-进度条组件：显示两条进度条', () => {
    component._data = [{
      title: '欧曼',
      progress: '50',
      progressTwo: '50'
    }];
    fixture.detectChanges();
    const $lift = fixture.debugElement.query(By.css('.progress-content .lift'));
    const $sort1 = fixture.debugElement.query(By.css('.progress-content .sort1'));
    const $sort2 = fixture.debugElement.query(By.css('.progress-content .sort2'));
    const $progressSec = fixture.debugElement.query(By.css('.progress-content .progress-sec-all'));

    expect($lift).toBeFalsy();
    expect($sort2).toBeFalsy();
    expect($sort1).toBeFalsy();
    expect($progressSec).toBeTruthy();
  });
});
