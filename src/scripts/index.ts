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
    drawTable.display();
  };
  p5.mouseClicked = (event: MouseEvent) => {
    if (
      mainState.thereAreCurves &&
      event.target ==
        document.getElementById('canvas-container').firstElementChild
    ) {
      const x = event.offsetX;
      const y = event.offsetY;
      drawTable.selectedCurve.addControlPoint(new Point(x, y, p5));
    }
  };
};

//Defining Listeners
document.addEventListener('DOMContentLoaded', () => {
  mainState = MainState.getInstance();
  new P5(sketch);
  mainState._addSubject.subscribe((value) =>
    value ? drawTable.createNewCurve() : null,
  );
  mainState._deleteSubject.subscribe((value) => {
    if (value) {
      drawTable.deleteSelectedCurve();
      if (drawTable.curves.length === 0) mainState.disableButtons(true);
    }
  });
  mainState._arrowLeftSubject.subscribe((value) =>
    value ? drawTable.changeSelectedCurve('left') : null,
  );
  mainState._arrowRightSubject.subscribe((value) =>
    value ? drawTable.changeSelectedCurve('right') : null,
  );
  mainState._controlPolygonsSubject.subscribe((value) =>
    value ? console.log(value) : null,
  );
  mainState._curvesSubject.subscribe((value) =>
    value ? console.log(value) : null,
  );
});
