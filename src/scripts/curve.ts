import p5 from 'p5';
import Point from './point';

export default class Curve {
  private _P5: p5;
  private _controlPoints: Array<Point> = [];
  private _curvePoints: Array<Point> = [];
  private _isSelected: boolean;

  constructor(P5: p5) {
    this._P5 = P5;
    this._isSelected = true;
  }

  public get controlPoints(): Array<Point> {
    return this._controlPoints;
  }

  public get curvePoints(): Array<Point> {
    return this._curvePoints;
  }

  public set isSelected(isSelected: boolean) {
    this._isSelected = isSelected;
  }

  public addControlPoint(point: Point): void {
    this._controlPoints.push(point);
  }

  public moveControlPoint(point: Point): void {
    const index = this._controlPoints.indexOf(point);
    this._controlPoints = this._controlPoints.splice(index, 1, point);
  }

  public deleteControlPoint(index: number): void {
    this._controlPoints.splice(index, 1);
  }

  private showControlPolygons(): void {
    if (this._controlPoints.length > 1) {
      for (let i = 0; i < this._controlPoints.length; i++) {
        if (i !== this._controlPoints.length - 1) {
          if (this._isSelected) this._P5.stroke(105, 125, 183);
          else this._P5.stroke(220, 220, 220);
          this._P5.line(
            this._controlPoints[i].x,
            this._controlPoints[i].y,
            this._controlPoints[i + 1].x,
            this._controlPoints[i + 1].y,
          );
        }
      }
    }
  }

  public display(
    showControlPoints: boolean,
    showControlPolygons: boolean,
    showCurves: boolean,
  ): void {
    if (showControlPoints)
      this._controlPoints.forEach((controlPoint) =>
        controlPoint.display(this._isSelected),
      );
    if (showControlPolygons) this.showControlPolygons();
  }
}
