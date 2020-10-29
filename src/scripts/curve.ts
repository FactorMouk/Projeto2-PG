import Point from './point';

export default class Curve {
  private _controlPoints: Array<Point> = [];
  private _curvePoints: Array<Point> = [];

  public get controlPoints(): Array<Point> {
    return this._controlPoints;
  }

  public get curvePoints(): Array<Point> {
    return this._curvePoints;
  }

  public addControlPoint(point: Point): void {
    this._controlPoints.push(point);
  }

  public moveControlPoint(point: Point): void {
    const index = this._controlPoints.indexOf(point);
    this._controlPoints = this._controlPoints.splice(index, 1, point);
  }

  public deleteControlPoint(point: Point): void {
    const index = this._controlPoints.indexOf(point);
    this._controlPoints = this._controlPoints.splice(index, 1);
  }

  public display(): void {}
}
