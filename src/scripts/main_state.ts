import { Subject } from 'rxjs';

export default class MainState {
  private static _instance: MainState;

  private _avaliations = 0;
  private _controlPointsIsVisible = true;
  private _controlPolygonsIsVisible = true;
  private _curvesIsVisible = true;

  public _addSubject: Subject<boolean> = new Subject<boolean>();
  public _removeSubject: Subject<boolean> = new Subject<boolean>();
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

  private defineListeners(): void {
    const addButton = document.getElementById('add-button');
    const deleteButton = document.getElementById('delete-button');
    const arrowLeftButton = document.getElementById('arrow-left-button');
    const arrowRightButton = document.getElementById('arrow-right-button');
    const controlPointsButton = document.getElementById(
      'control-points-button',
    );
    const controlPolygonsButton = document.getElementById(
      'control-polygons-button',
    );
    const curvesButton = document.getElementById('curves-button');
    if (
      addButton !== null &&
      deleteButton !== null &&
      arrowLeftButton !== null &&
      arrowRightButton !== null &&
      controlPointsButton !== null &&
      controlPolygonsButton !== null &&
      curvesButton != null
    ) {
      addButton.addEventListener('click', () => this._addSubject.next(true));
      deleteButton.addEventListener('click', () =>
        this._removeSubject.next(true),
      );
      arrowLeftButton.addEventListener('click', () =>
        this._arrowLeftSubject.next(true),
      );
      arrowRightButton.addEventListener('click', () =>
        this._arrowRightSubject.next(true),
      );
      controlPointsButton.addEventListener('click', () => {
        this._controlPolygonsIsVisible = !this._controlPolygonsIsVisible;
        this._controlPointsSubject.next(true);
      });
      controlPolygonsButton.addEventListener('click', () => {
        this._controlPolygonsIsVisible = !this._controlPolygonsIsVisible;
        this._controlPolygonsSubject.next(true);
      });
      curvesButton.addEventListener('click', () => {
        this._curvesIsVisible = !this._curvesIsVisible;
        this._curvesSubject.next(true);
      });
    }
  }
}
