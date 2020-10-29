import { Subject } from 'rxjs';

export default class MainState {
  private static _instance: MainState;

  private _thereAreCurves = false;
  private _avaliations = 0;
  private _controlPointsIsVisible = true;
  private _controlPolygonsIsVisible = true;
  private _curvesIsVisible = true;

  private _addButton: HTMLInputElement = null;
  private _deleteButton: HTMLInputElement = null;
  private _arrowLeftButton: HTMLInputElement = null;
  private _arrowRightButton: HTMLInputElement = null;
  private _controlPointsButton: HTMLInputElement = null;
  private _controlPolygonsButton: HTMLInputElement = null;
  private _curvesButton: HTMLInputElement = null;
  private _pointsAmountInput: HTMLInputElement = null;

  public _addSubject: Subject<boolean> = new Subject<boolean>();
  public _deleteSubject: Subject<boolean> = new Subject<boolean>();
  public _arrowLeftSubject: Subject<boolean> = new Subject<boolean>();
  public _arrowRightSubject: Subject<boolean> = new Subject<boolean>();
  public _controlPointsSubject: Subject<boolean> = new Subject<boolean>();
  public _controlPolygonsSubject: Subject<boolean> = new Subject<boolean>();
  public _curvesSubject: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.defineListeners();
  }

  public static getInstance(): MainState {
    if (!MainState._instance) {
      MainState._instance = new MainState();
    }
    return MainState._instance;
  }

  public get thereAreCurves(): boolean {
    return this._thereAreCurves;
  }

  public get avaliations(): number {
    return this._avaliations;
  }

  public get controlPointsIsVisible(): boolean {
    return this._controlPointsIsVisible;
  }

  public get controlPolygonsIsVisible(): boolean {
    return this._controlPolygonsIsVisible;
  }

  public get curvesIsVisible(): boolean {
    return this._curvesIsVisible;
  }

  public disableButtons(disabled: boolean): void {
    if (!disabled) {
      this._thereAreCurves = true;
    } else {
      this._thereAreCurves = false;
    }
    this._deleteButton.disabled = disabled;
    this._arrowLeftButton.disabled = disabled;
    this._arrowRightButton.disabled = disabled;
    this._controlPointsButton.disabled = disabled;
    this._controlPolygonsButton.disabled = disabled;
    this._curvesButton.disabled = disabled;
    this._pointsAmountInput.disabled = disabled;
  }

  private defineListeners(): void {
    this._addButton = <HTMLInputElement>document.getElementById('add-button');
    this._deleteButton = <HTMLInputElement>(
      document.getElementById('delete-button')
    );
    this._arrowLeftButton = <HTMLInputElement>(
      document.getElementById('arrow-left-button')
    );
    this._arrowRightButton = <HTMLInputElement>(
      document.getElementById('arrow-right-button')
    );
    this._controlPointsButton = <HTMLInputElement>(
      document.getElementById('control-points-button')
    );
    this._controlPolygonsButton = <HTMLInputElement>(
      document.getElementById('control-polygons-button')
    );
    this._curvesButton = <HTMLInputElement>(
      document.getElementById('curves-button')
    );
    this._pointsAmountInput = <HTMLInputElement>(
      document.getElementById('points-amount-input')
    );
    if (
      this._addButton !== null &&
      this._deleteButton !== null &&
      this._arrowLeftButton !== null &&
      this._arrowRightButton !== null &&
      this._controlPointsButton !== null &&
      this._controlPolygonsButton !== null &&
      this._curvesButton !== null &&
      this._pointsAmountInput !== null
    ) {
      this.disableButtons(true);
      this._addButton.addEventListener('click', () => {
        if (!this._thereAreCurves) {
          this.disableButtons(false);
        }
        this._addSubject.next(true);
      });
      this._deleteButton.addEventListener('click', () =>
        this._deleteSubject.next(true),
      );
      this._arrowLeftButton.addEventListener('click', () =>
        this._arrowLeftSubject.next(true),
      );
      this._arrowRightButton.addEventListener('click', () =>
        this._arrowRightSubject.next(true),
      );
      this._controlPointsButton.addEventListener('click', () => {
        this._controlPolygonsIsVisible = !this._controlPolygonsIsVisible;
        this._controlPointsSubject.next(true);
      });
      this._controlPolygonsButton.addEventListener('click', () => {
        this._controlPolygonsIsVisible = !this._controlPolygonsIsVisible;
        this._controlPolygonsSubject.next(true);
      });
      this._curvesButton.addEventListener('click', () => {
        this._curvesIsVisible = !this._curvesIsVisible;
        this._curvesSubject.next(true);
      });
      this._pointsAmountInput.addEventListener('change', () => {
        this._avaliations = parseInt(this._pointsAmountInput.value);
        this._curvesSubject.next(true);
      });
    }
  }
}
