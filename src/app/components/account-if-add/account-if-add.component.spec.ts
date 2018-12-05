import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { AccountIfAddComponent } from './account-if-add.component';

describe('AccountIfAddComponent', () => {
  let component: AccountIfAddComponent;
  let fixture: ComponentFixture<AccountIfAddComponent>;
  let title;
  let onlyOne;
  let notOnlyOne;
  let classNameHtml;
  let add;
  let data;
  let De: DebugElement;
  let El: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountIfAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountIfAddComponent);
    component = fixture.componentInstance;
    De = fixture.debugElement;
    El = De.nativeElement;
    title = fixture.nativeElement.querySelector('.title');
    onlyOne = fixture.nativeElement.querySelector('.only-one');
    notOnlyOne = fixture.nativeElement.querySelector('.not-only-one');
    add = fixture.nativeElement.querySelector('.add');

    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('验证当没有数据传入时，name显示为"", number显示为0', () => {
  //   component.data = [];
  //   fixture.detectChanges();
  //   expect(title.textContent.toBe(''));
  //   expect(onlyOne.textContent.toBe(0));
  //   expect(notOnlyOne.textContent.toBe(0));

  // });

});
