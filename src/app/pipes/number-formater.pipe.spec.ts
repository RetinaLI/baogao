import { NumberFormaterPipe } from './number-formater.pipe';

describe('NumberFormaterPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberFormaterPipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms 3000 to [3000, ""]', () => {
    const pipe = new NumberFormaterPipe();
    expect(pipe.transform(3000)).toEqual([3000, '']);
  });

  it('transforms 300000 to [30, "万"]', () => {
    const pipe = new NumberFormaterPipe();
    expect(pipe.transform(300000)).toEqual([30, '万']);
  });

  it('transforms 300000000 to [3, "亿"]', () => {
    const pipe = new NumberFormaterPipe();
    expect(pipe.transform(300000000)).toEqual([3, '亿']);
  });

});
