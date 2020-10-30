import p5 from 'p5';

export default class Point {
  private _P5: p5;
  private _x: number;
  private _y: number;
  private _dragged: boolean;
  private _type: string;

  constructor(x: number, y: number, P5: p5, type: string) {
    this._P5 = P5;
    this._x = x;
    this._y = y;
    this._dragged = false;
    this._type = type;
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

  public get dragged(): boolean {
    return this._dragged;
  }

  public set dragged(dragged: boolean) {
    this._dragged = dragged;
  }

  public get type(): string {
    return this._type;
  }

  public set type(type: string) {
    this._type = type;
  }

  display(isSelected: boolean): void {
    if (this._dragged && this.type == 'control') {
      this._x = this._P5.mouseX;
      this._y = this._P5.mouseY;
    }
    if (isSelected && this.type === 'control') {
      this._P5.fill(105, 125, 183);
      this._P5.stroke(105, 125, 183);
    } else if (!isSelected && this.type === 'control') {
      this._P5.fill(220, 220, 220);
      this._P5.stroke(220, 220, 220);
    } else if (this.type === 'curve') {
      this._P5.fill(0);
      this._P5.stroke(0);
      this._P5.strokeWeight(2);
    }
    if (this.type == 'control') this._P5.circle(this._x, this._y, 10);
    else if (this.type == 'curve') this._P5.circle(this._x, this._y, 1);
  }
}
