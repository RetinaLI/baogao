import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { AccountIfAddComponent } from './account-if-add.component';
import { By } from '@angular/platform-browser';
import { IAccountIfAddData } from './account-if-add.interface';


describe('测试AccountIfAddComponent组件', () => {
  let component: AccountIfAddComponent;
  let fixture: ComponentFixture<AccountIfAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountIfAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountIfAddComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('验证当没有数据传入时，name显示为"", number显示为0', () => {
    component._data = [];
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.title'));
    const onlyOne = fixture.debugElement.query(By.css('.only-one'));
    const notOnlyOne = fixture.debugElement.query(By.css('.not-only-one'));
    const add = fixture.debugElement.query(By.css('.add'));

    expect(title).toBeFalsy();
    expect(onlyOne).toBeFalsy();
    expect(notOnlyOne).toBeFalsy();
    expect(add).toBeFalsy();
    expect(component.showNum).toBeFalsy();
  });

  it('测试当传入的number为单个数字时', () => {
    component._data = [
      {name: '分公司', numberVal: 22},
      {name: '路线', numberVal: 1333}
    ] as IAccountIfAddData[];
    fixture.detectChanges();
    const title = fixture.debugElement.queryAll(By.css('.title'));
    const onlyOne = fixture.debugElement.query(By.css('.only-one')).nativeElement;
    const notOnlyOne = fixture.debugElement.query(By.css('.not-only-one'));
    const add = fixture.debugElement.query(By.css('.add'));
    // 断言
    expect(title[1].nativeElement.textContent).toContain('路线');
    expect(onlyOne.textContent).toContain(22);
    expect(notOnlyOne).toBeFalsy();
    expect(add).toBeFalsy();
  });

  it('测试当传入的number为数组时', () => {
    component._data = [
      {name: '路线', numberVal: [1333, 3]}
    ];
    component.showNum = true;
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.title')).nativeElement;
    const onlyOne = fixture.debugElement.query(By.css('.only-one'));
    const notOnlyOne = fixture.debugElement.query(By.css('.not-only-one')).nativeElement;
    const add = fixture.debugElement.query(By.css('.add')).nativeElement;
    // 断言
    expect(title.textContent).toContain('路线');
    expect(onlyOne).toBeFalsy();
    expect(notOnlyOne.textContent).toContain(1333);
    expect(add.textContent).toContain('+3');
  });

  it('测试当传入的number的数值较大时，（超过1万）', () => {
    component._data = [
      {name: '分公司(个)', numberVal: 2334552},
      {name: '路线(条)', numberVal: 13346663}
    ];
    fixture.detectChanges();
    const title = fixture.debugElement.queryAll(By.css('.title'));
    const onlyOne = fixture.debugElement.query(By.css('.only-one')).nativeElement;
    const add = fixture.debugElement.query(By.css('.add'));
    // 断言
    expect(title[0].nativeElement.textContent).toContain('分公司(万个)');
    expect(onlyOne.textContent).toContain(233.46);
    expect(add).toBeFalsy();
  });
});
