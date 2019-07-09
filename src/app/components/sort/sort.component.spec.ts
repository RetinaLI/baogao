import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortComponent } from './sort.component';
import { SubPipe } from 'src/app/pipes/sub.pipe';
import { UnitPipe } from 'src/app/pipes/unit.pipe';
import {By} from '@angular/platform-browser';

describe('SortComponent-阶梯冠亚军排行前3名', () => {
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
  it('组件：crown为false', () => {
    const $noCrown = fixture.debugElement.query(By.css('.noCrown'));
    const $crown = fixture.debugElement.query(By.css('.crown'));

    expect($noCrown).toBeTruthy();
    expect($crown).toBeFalsy();
  });
  it('组件：crown为false时,数据为空时', () => {
    component.data = [];
    fixture.detectChanges();
    const $progress = fixture.debugElement.query(By.css('.sort'));

    expect($progress).toBeFalsy();
  });
  it('组件：不传lift升降序', () => {
    component.data = [{
      title: '欧曼',
      progress: '50'
    }, {
      title: '欧曼',
      progress: '50'
    }, {
      title: '欧曼',
      progress: '50'
    }];
    fixture.detectChanges();
    const $progress = fixture.debugElement.query(By.css('.sort .one-icon'));

    expect($progress).toBeFalsy();
  });
  it('组件：传lift升降序', () => {
    component.data = [{
      title: '欧曼',
      progress: '50',
      lift: '0'
    }, {
      title: '欧曼',
      progress: '50',
      lift: '0'
    }, {
      title: '欧曼',
      progress: '50',
      lift: '0'
    }];
    fixture.detectChanges();
    const $progress = fixture.debugElement.query(By.css('.sort .one-icon'));

    expect($progress).toBeTruthy();
  });
  it('组件：是否显示其余单量', () => {
    component.data = [{
      title: '欧曼',
      progress: '50',
      lift: '0',
      waybillNumber: '12'
    }, {
      title: '欧曼',
      progress: '50',
      lift: '0',
      waybillNumber: '12'
    }, {
      title: '欧曼',
      progress: '50',
      lift: '0',
      waybillNumber: '12'
    }];
    component.show10 = true;
    fixture.detectChanges();
    const $progress = fixture.debugElement.query(By.css('.waybillNumber'));

    expect($progress).toBeTruthy();
  });
  it('组件：crown是true时，显示单量', () => {
    component.data = [{
      title: '欧曼',
      progress: '50',
      lift: '0',
      waybillNumber: '12'
    }, {
      title: '欧曼',
      progress: '50',
      lift: '0',
      waybillNumber: '12'
    }, {
      title: '欧曼',
      progress: '50',
      lift: '0',
      waybillNumber: '12'
    }];
    component.show10 = true;
    component.crown = true;
    fixture.detectChanges();
    const $noCrown = fixture.debugElement.query(By.css('.noCrown'));
    const $crown = fixture.debugElement.query(By.css('.crown'));

    expect($noCrown).toBeFalsy();
    expect($crown).toBeTruthy();
  });
});
