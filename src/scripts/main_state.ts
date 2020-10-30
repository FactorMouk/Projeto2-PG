import { Subject } from 'rxjs';

export default class MainState {
  private static _instance: MainState;

  private _controlPointsMode = null;
  private _thereAreCurves = false;
  private _selectedCurveHasThreePoints = false;
  private _controlPointsIsVisible = true;
  private _controlPolygonsIsVisible = true;
  private _curvesIsVisible = true;

  private _addCurveButton: HTMLInputElement = null;
  private _deleteCurveButton: HTMLInputElement = null;
  private _arrowLeftButton: HTMLInputElement = null;
  private _arrowRightButton: HTMLInputElement = null;
  private _addControlPointButton: HTMLInputElement = null;
  private _moveControlPointButton: HTMLInputElement = null;
  private _deleteControlPointButton: HTMLInputElement = null;
  private _controlPointsButton: HTMLInputElement = null;
  private _controlPolygonsButton: HTMLInputElement = null;
  private _curvesButton: HTMLInputElement = null;
  private _pointsAmountInput: HTMLInputElement = null;

  public _addCurveSubject: Subject<boolean> = new Subject<boolean>();
  public _deleteCurveSubject: Subject<boolean> = new Subject<boolean>();
  public _arrowLeftSubject: Subject<boolean> = new Subject<boolean>();
  public _arrowRightSubject: Subject<boolean> = new Subject<boolean>();
  public _addControlPointSubject: Subject<boolean> = new Subject<boolean>();
  public _moveControlPointSubject: Subject<boolean> = new Subject<boolean>();
  public _deleteControlPointSubject: Subject<boolean> = new Subject<boolean>();
  public _pointsAmountSubject: Subject<number> = new Subject<number>();

  constructor() {
    this.defineListeners();
    this.fadeOutThreeDotsAlert(true);
    document.getElementById('alert-icon').style.display = 'block';
  }

  public static getInstance(): MainState {
    if (!MainState._instance) {
      MainState._instance = new MainState();
    }
    return MainState._instance;
  }

  public get controlPointsMode(): string {
    return this._controlPointsMode;
  }

  public set controlPointsMode(controlPointsMode: string) {
    this._controlPointsMode = controlPointsMode;
  }

  public get thereAreCurves(): boolean {
    return this._thereAreCurves;
  }

  public set thereAreCurves(thereAreCurves: boolean) {
    this._thereAreCurves = thereAreCurves;
  }

  public get selectedCurveHasThreePoints(): boolean {
    return this._selectedCurveHasThreePoints;
  }

  public set selectedCurveHasThreePoints(selectedCurveHasThreePoints: boolean) {
    this._selectedCurveHasThreePoints = selectedCurveHasThreePoints;
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

  public setPointsAmountInput(pointsAmountInput: number): void {
    const input: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('points-amount-input')
    );
    input.value = pointsAmountInput.toString();
  }

  public disableButtons(disabled: boolean, exceptions: Array<string>): void {
    if (exceptions.findIndex((exception) => exception === 'addCurve') === -1)
      this._addCurveButton.disabled = disabled;
    else this._addCurveButton.disabled = !disabled;
    if (exceptions.findIndex((exception) => exception === 'deleteCurve') === -1)
      this._deleteCurveButton.disabled = disabled;
    else this._deleteCurveButton.disabled = !disabled;

    if (exceptions.findIndex((exception) => exception === 'arrowLeft') === -1)
      this._arrowLeftButton.disabled = disabled;
    else this._arrowLeftButton.disabled = !disabled;

    if (exceptions.findIndex((exception) => exception === 'arrowRight') === -1)
      this._arrowRightButton.disabled = disabled;
    else this._arrowRightButton.disabled = !disabled;

    if (
      exceptions.findIndex((exception) => exception === 'addControlPoint') ===
      -1
    )
      this._addControlPointButton.disabled = disabled;
    else this._addControlPointButton.disabled = !disabled;

    if (
      exceptions.findIndex((exception) => exception === 'moveControlPoint') ===
      -1
    )
      this._moveControlPointButton.disabled = disabled;
    else this._moveControlPointButton.disabled = !disabled;

    if (
      exceptions.findIndex(
        (exception) => exception === 'deleteControlPoint',
      ) === -1
    )
      this._deleteControlPointButton.disabled = disabled;
    else this._deleteControlPointButton.disabled = !disabled;

    if (
      exceptions.findIndex((exception) => exception === 'controlPoints') === -1
    )
      this._controlPointsButton.disabled = disabled;
    else this._controlPointsButton.disabled = !disabled;

    if (
      exceptions.findIndex((exception) => exception === 'controlPolygons') ===
      -1
    )
      this._controlPolygonsButton.disabled = disabled;
    else this._controlPolygonsButton.disabled = !disabled;

    if (exceptions.findIndex((exception) => exception === 'curves') === -1)
      this._curvesButton.disabled = disabled;
    else this._curvesButton.disabled = !disabled;

    if (
      exceptions.findIndex((exception) => exception === 'pointsAmount') === -1
    )
      this._pointsAmountInput.disabled = disabled;
    else this._pointsAmountInput.disabled = !disabled;
  }

  public controlPointsButtonFormatter(clicked: string): void {
    if (clicked === 'add') {
      this._addControlPointButton.style.padding = '15px';
      this._moveControlPointButton.style.padding = '10px';
      this._deleteControlPointButton.style.padding = '10px';
      document.getElementById('control-point-mode-label').innerHTML =
        'Modo Adicionar';
    }
    if (clicked === 'move') {
      this._addControlPointButton.style.padding = '10px';
      this._moveControlPointButton.style.padding = '15px';
      this._deleteControlPointButton.style.padding = '10px';
      document.getElementById('control-point-mode-label').innerHTML =
        'Modo Mover';
    }
    if (clicked === 'delete') {
      this._addControlPointButton.style.padding = '10px';
      this._moveControlPointButton.style.padding = '10px';
      this._deleteControlPointButton.style.padding = '15px';
      document.getElementById('control-point-mode-label').innerHTML =
        'Modo Deletar';
    }
  }

  public previewButtonsFormatter(): void {
    const cpbv = document.getElementById('cpbv');
    const cpbi = document.getElementById('cpbi');
    const cpobv = document.getElementById('cpobv');
    const cpobi = document.getElementById('cpobi');
    const cbv = document.getElementById('cbv');
    const cbi = document.getElementById('cbi');
    if (this.controlPointsIsVisible) {
      cpbv.style.display = 'block';
      cpbi.style.display = 'none';
    } else {
      cpbv.style.display = 'none';
      cpbi.style.display = 'block';
    }
    if (this.controlPolygonsIsVisible) {
      cpobv.style.display = 'block';
      cpobi.style.display = 'none';
    } else {
      cpobv.style.display = 'none';
      cpobi.style.display = 'block';
    }
    if (this.curvesIsVisible) {
      cbv.style.display = 'block';
      cbi.style.display = 'none';
    } else {
      cbv.style.display = 'none';
      cbi.style.display = 'block';
    }
  }

  public onControlPointsLessThenThree(): void {
    this.fadeOutThreeDotsAlert(false);
    this.disableButtons(true, ['addControlPoint']);
    this.controlPointsButtonFormatter('add');
    this._selectedCurveHasThreePoints = false;
  }

  private defineListeners(): void {
    this._addCurveButton = <HTMLInputElement>(
      document.getElementById('add-curve-button')
    );
    this._deleteCurveButton = <HTMLInputElement>(
      document.getElementById('delete-curve-button')
    );
    this._arrowLeftButton = <HTMLInputElement>(
      document.getElementById('arrow-left-button')
    );
    this._arrowRightButton = <HTMLInputElement>(
      document.getElementById('arrow-right-button')
    );
    this._addControlPointButton = <HTMLInputElement>(
      document.getElementById('add-control-point-button')
    );
    this._moveControlPointButton = <HTMLInputElement>(
      document.getElementById('move-control-point-button')
    );
    this._deleteControlPointButton = <HTMLInputElement>(
      document.getElementById('delete-control-point-button')
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
      this._addCurveButton !== null &&
      this._deleteCurveButton !== null &&
      this._arrowLeftButton !== null &&
      this._arrowRightButton !== null &&
      this._addControlPointButton !== null &&
      this._moveControlPointButton !== null &&
      this._deleteControlPointButton !== null &&
      this._controlPointsButton !== null &&
      this._controlPolygonsButton !== null &&
      this._curvesButton !== null &&
      this._pointsAmountInput !== null
    ) {
      this.disableButtons(true, ['addCurve']);
      this._addCurveButton.addEventListener('click', () => {
        if (!this._thereAreCurves) {
          this._thereAreCurves = true;
          this.fadeOutNotCurvesAlert(true);
        }
        this.onControlPointsLessThenThree();
        this.setPointsAmountInput(2);
        this._addCurveSubject.next(true);
      });
      this._deleteCurveButton.addEventListener('click', () =>
        this._deleteCurveSubject.next(true),
      );
      this._arrowLeftButton.addEventListener('click', () =>
        this._arrowLeftSubject.next(true),
      );
      this._arrowRightButton.addEventListener('click', () =>
        this._arrowRightSubject.next(true),
      );
      this._addControlPointButton.addEventListener('click', () => {
        this.controlPointsButtonFormatter('add');
        this._addControlPointSubject.next(true);
      });
      this._moveControlPointButton.addEventListener('click', () => {
        this.controlPointsButtonFormatter('move');
        this._moveControlPointSubject.next(true);
      });
      this._deleteControlPointButton.addEventListener('click', () => {
        this.controlPointsButtonFormatter('delete');
        this._deleteControlPointSubject.next(true);
      });
      this._controlPointsButton.addEventListener('click', () => {
        this._controlPointsIsVisible = !this._controlPointsIsVisible;
        this.previewButtonsFormatter();
      });
      this._controlPolygonsButton.addEventListener('click', () => {
        this._controlPolygonsIsVisible = !this._controlPolygonsIsVisible;
        this.previewButtonsFormatter();
      });
      this._curvesButton.addEventListener('click', () => {
        this._curvesIsVisible = !this._curvesIsVisible;
        this.previewButtonsFormatter();
      });
      this._pointsAmountInput.addEventListener('change', () => {
        if (parseInt(this._pointsAmountInput.value) < 2) {
          this._pointsAmountSubject.next(2);
          this.setPointsAmountInput(2);
        }
        this._pointsAmountSubject.next(parseInt(this._pointsAmountInput.value));
      });
    }
  }

  public fadeOutThreeDotsAlert(fadeOut: boolean): void {
    if (fadeOut) {
      document.getElementById('three-dots-alert').style.display = 'none';
      document.getElementById('alert-icon').style.display = 'none';
    } else {
      document.getElementById('three-dots-alert').style.display = 'block';
      document.getElementById('alert-icon').style.display = 'block';
    }
  }

  public fadeOutNotCurvesAlert(fadeOut: boolean): void {
    if (fadeOut) {
      document.getElementById('not-curves-alert').style.display = 'none';
      document.getElementById('alert-icon').style.display = 'none';
    } else {
      document.getElementById('not-curves-alert').style.display = 'block';
      document.getElementById('alert-icon').style.display = 'block';
    }
  }
}
