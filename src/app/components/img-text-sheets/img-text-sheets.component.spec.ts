import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgTextSheetsComponent } from './img-text-sheets.component';
import { IImgTextSheetsData } from './img-text-sheets.interface';
import { By } from '@angular/platform-browser';

describe('测试ImgTextSheetsComponent组件', () => {
  let component: ImgTextSheetsComponent;
  let fixture: ComponentFixture<ImgTextSheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgTextSheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgTextSheetsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('没有传入数据时，img显示空，name显示空，num显示0', () => {
    component.sheetsList = [];
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('.img'));
    const title = fixture.debugElement.query(By.css('.title'));
    const num = fixture.debugElement.query(By.css('.num'));

    expect(img).toBeFalsy();
    expect(title).toBeFalsy();
    expect(num).toBeFalsy();
  });

  it('传入数据加载成功时，页面显示', () => {
    component.sheetsList = [{
      img: require('../../../assets/images/serve/true-icon2.png'),
      title: "真实服务单",
      num: 234
    }];
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('.img'));
    const title = fixture.debugElement.query(By.css('.title'));
    const num = fixture.debugElement.query(By.css('.num'));

    expect(img).toBeTruthy();
    expect(title).toBeTruthy();
    expect(num).toBeTruthy();
  })
});
