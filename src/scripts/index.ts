import P5 from 'p5';
import MainState from './main_state';
import DrawTable from './draw_table';
import Point from './point';

let mainState: MainState;
let drawTable: DrawTable;

//Defining Sketch Draw
const sketch = (p5: P5) => {
  p5.setup = () => {
    drawTable = DrawTable.getInstance(p5);
    const canvas = p5.createCanvas(1024, 768);
    canvas.parent('canvas-container');
  };
  p5.draw = () => {
    p5.background(255);
    drawTable.display(
      mainState.controlPointsIsVisible,
      mainState.controlPolygonsIsVisible,
      mainState.curvesIsVisible,
    );
  };
  p5.mouseReleased = (event: MouseEvent) => {
    if (
      mainState.thereAreCurves &&
      event.target ==
        document.getElementById('canvas-container').firstElementChild
    ) {
      const controlPoints = drawTable.selectedCurve.controlPoints;
      if (mainState.controlPointsMode == 'add') {
        drawTable.selectedCurve._isDrawing = true;
        const x = event.offsetX;
        const y = event.offsetY;
        drawTable.selectedCurve.addControlPoint(new Point(x, y, p5, 'control'));
        if (drawTable.selectedCurve.controlPoints.length >= 3) {
          mainState.selectedCurveHasThreePoints = true;
          mainState.fadeOutThreeDotsAlert(true);
          mainState.disableButtons(false, []);
        }
      }
      if (mainState.controlPointsMode === 'move') {
        drawTable.selectedCurve._isDrawing = true;
        for (let i = 0; i < controlPoints.length; i++) {
          if (controlPoints[i].dragged) {
            if (mainState.controlPointsMode === 'move') {
              controlPoints[i].dragged = false;
            } else if (mainState.controlPointsMode === 'delete') {
              drawTable.selectedCurve.deleteControlPoint(i);
            }
          }
        }
      }
      if (mainState.controlPointsMode === 'delete') {
        drawTable.selectedCurve._isDrawing = true;
        for (let i = 0; i < controlPoints.length; i++) {
          if (
            p5.dist(
              controlPoints[i].x,
              controlPoints[i].y,
              p5.mouseX,
              p5.mouseY,
            ) < 10
          ) {
            drawTable.selectedCurve.deleteControlPoint(i);
            if (controlPoints.length < 3) {
              mainState.onControlPointsLessThenThree();
              mainState.controlPointsMode = 'add';
            }
            break;
          }
        }
      }
    }
  };
  p5.mousePressed = (event: MouseEvent) => {
    if (
      mainState.controlPointsMode == 'move' &&
      mainState.thereAreCurves &&
      event.target ==
        document.getElementById('canvas-container').firstElementChild
    ) {
      const controlPoints = drawTable.selectedCurve.controlPoints;
      for (let i = 0; i < controlPoints.length; i++) {
        if (
          p5.dist(
            controlPoints[i].x,
            controlPoints[i].y,
            p5.mouseX,
            p5.mouseY,
          ) < 10
        ) {
          controlPoints[i].dragged = true;
          break;
        }
      }
    }
  };
  p5.mouseDragged = (event: MouseEvent) => {
    if (
      mainState.controlPointsMode == 'move' &&
      mainState.thereAreCurves &&
      event.target ==
        document.getElementById('canvas-container').firstElementChild
    ) {
      drawTable.selectedCurve._isDrawing = true;
    }
  };
};

//Defining Listeners
document.addEventListener('DOMContentLoaded', () => {
  mainState = MainState.getInstance();
  new P5(sketch);
  mainState._addCurveSubject.subscribe((value) => {
    if (value) {
      drawTable.createNewCurve();
      mainState.controlPointsMode = 'add';
    }
  });
  mainState._deleteCurveSubject.subscribe((value) => {
    if (value) {
      drawTable.deleteSelectedCurve();
      if (drawTable.curves.length === 0) {
        mainState.disableButtons(true, ['addCurve']);
        mainState.thereAreCurves = false;
        mainState.fadeOutNotCurvesAlert(false);
        mainState.setPointsAmountInput(2);
      } else {
        mainState.setPointsAmountInput(drawTable.selectedCurve.avaliations);
      }
    }
  });
  mainState._arrowLeftSubject.subscribe((value) => {
    if (value) {
      drawTable.changeSelectedCurve('left');
      mainState.setPointsAmountInput(drawTable.selectedCurve.avaliations);
    }
  });
  mainState._arrowRightSubject.subscribe((value) => {
    if (value) {
      drawTable.changeSelectedCurve('right');
      mainState.setPointsAmountInput(drawTable.selectedCurve.avaliations);
    }
  });
  mainState._addControlPointSubject.subscribe((value) =>
    value ? (mainState.controlPointsMode = 'add') : null,
  );
  mainState._moveControlPointSubject.subscribe((value) =>
    value ? (mainState.controlPointsMode = 'move') : null,
  );
  mainState._deleteControlPointSubject.subscribe((value) =>
    value ? (mainState.controlPointsMode = 'delete') : null,
  );
  mainState._pointsAmountSubject.subscribe((value: number) => {
    drawTable.selectedCurve.avaliations = value;
    drawTable.selectedCurve._isDrawing = true;
  });
});
