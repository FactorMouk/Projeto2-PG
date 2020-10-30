import p5 from 'p5';
import Curve from './curve';

export default class DrawTable {
  private static _instance: DrawTable;
  private _P5: p5;
  private _curves: Array<Curve> = [];
  private _selectedCurveIndex = 0;

  constructor(P5: p5) {
    this._P5 = P5;
  }

  public static getInstance(P5: p5): DrawTable {
    if (!DrawTable._instance) {
      DrawTable._instance = new DrawTable(P5);
    }
    return DrawTable._instance;
  }

  public get curves(): Array<Curve> {
    return this._curves;
  }

  public get selectedCurve(): Curve {
    return this._curves[this._selectedCurveIndex];
  }

  public createNewCurve(): void {
    this.unselectAllPreviousCurves();
    this._curves.push(new Curve(this._P5));
    this._selectedCurveIndex = this._curves.length - 1;
  }

  public deleteSelectedCurve(): void {
    this._curves.splice(this._selectedCurveIndex, 1);
    this.changeSelectedCurve('left');
  }

  public changeSelectedCurve(type: string): void {
    const previousIndex = this._selectedCurveIndex;
    if (type === 'left' && this._selectedCurveIndex !== 0)
      this._selectedCurveIndex--;
    else if (type === 'left' && this._selectedCurveIndex === 0)
      this._selectedCurveIndex = this._curves.length - 1;
    else if (
      type === 'right' &&
      this._selectedCurveIndex !== this._curves.length - 1
    )
      this._selectedCurveIndex++;
    else if (
      type === 'right' &&
      this._selectedCurveIndex === this._curves.length - 1
    )
      this._selectedCurveIndex = 0;
    if (this._curves[previousIndex])
      this._curves[previousIndex].isSelected = false;
    if (this._curves[this._selectedCurveIndex])
      this._curves[this._selectedCurveIndex].isSelected = true;
  }

  private unselectAllPreviousCurves() {
    this._curves.forEach((curve) => {
      curve.isSelected = false;
    });
  }

  public display(
    showControlPoints: boolean,
    showControlPolygons: boolean,
    showCurves: boolean,
  ): void {
    this._curves.forEach((curve) =>
      curve.display(showControlPoints, showControlPolygons, showCurves),
    );
  }
}
