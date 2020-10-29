import p5 from 'p5';

export default class Point {
  private _P5: p5;
  private _x: number;
  private _y: number;

  constructor(x: number, y: number, P5: p5) {
    this._x = x;
    this._y = y;
    this._P5 = P5;
  }

  public get x(): number {
    return this._x;
  }

  public set x(x: number) {
    this._x = x;
  }

  public get y(): number {
    return this._y;
  }

  public set y(y: number) {
    this._y = y;
  }

  display(): void {
    this._P5.fill(105, 125, 183);
    this._P5.circle(this._x, this._y, 10);
  }
}
