import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortListComponent } from './sort-list.component';
import { UnitPipe } from 'src/app/pipes/unit.pipe';
import {By} from '@angular/platform-browser';

describe('SortListComponent-top排行组件', () => {
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
  it('组件：数据为空', () => {
    component._data = [];
    fixture.detectChanges();
    const $progress = fixture.debugElement.query(By.css('.sort-content'));

    expect($progress).toBeFalsy();
  });
  it('组件：只传入title和progress', () => {
    component._data = [{
      title: '欧曼',
      progress: '50',
    }];
    fixture.detectChanges();
    const $lift = fixture.debugElement.query(By.css('.sort-content .lift'));
    const $sort = fixture.debugElement.query(By.css('.sort-content .sort'));
    const $listLine = fixture.debugElement.query(By.css('.sort-content .list-line'));
    const $note = fixture.debugElement.query(By.css('.sort-content .note'));

    expect($lift).toBeFalsy();
    expect($sort).toBeFalsy();
    expect($listLine).toBeTruthy();
    expect($note).toBeFalsy();
  });
  it('组件：只传入title和progress,需要排序sort', () => {
    component._data = [{
      title: '欧曼',
      progress: '50',
    }];
    component.sort = true;
    fixture.detectChanges();
    const $lift = fixture.debugElement.query(By.css('.sort-content .lift'));
    const $sort = fixture.debugElement.query(By.css('.sort-content .sort'));
    const $listLine = fixture.debugElement.query(By.css('.sort-content .list-line'));
    const $note = fixture.debugElement.query(By.css('.sort-content .note'));

    expect($lift).toBeFalsy();
    expect($sort).toBeTruthy();
    expect($listLine).toBeTruthy();
    expect($note).toBeFalsy();
  });
  it('组件：只传入title和progress,需要排序sort+升降', () => {
    component._data = [{
      title: '欧曼',
      progress: '50',
      lift: '0'
    }];
    component.sort = true;
    fixture.detectChanges();
    const $lift = fixture.debugElement.query(By.css('.sort-content .lift'));
    const $sort = fixture.debugElement.query(By.css('.sort-content .sort'));
    const $note = fixture.debugElement.query(By.css('.sort-content .note'));

    expect($lift).toBeTruthy();
    expect($sort).toBeTruthy();
    expect($note).toBeFalsy();
  });
  it('组件：只传入title和progress,显示运单总数+异常运单', () => {
    component._data = [{
      title: '欧曼',
      progress: '50',
      lift: '0',
      note: 12,
      errNote: 6
    }];
    component.sort = true;
    fixture.detectChanges();
    const $lift = fixture.debugElement.query(By.css('.sort-content .lift'));
    const $sort = fixture.debugElement.query(By.css('.sort-content .sort'));
    const $note = fixture.debugElement.query(By.css('.sort-content .note'));

    expect($lift).toBeTruthy();
    expect($sort).toBeTruthy();
    expect($note).toBeTruthy();
  });
});
