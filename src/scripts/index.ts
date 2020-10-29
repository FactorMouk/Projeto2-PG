import P5 from 'p5';
import MainState from './main_state';
import DrawTable from './draw_table';

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
  };
};

//Defining Listeners
document.addEventListener('DOMContentLoaded', () => {
  mainState = MainState.getInstance();
  mainState._addSubject.subscribe((value) =>
    value ? console.log(value) : null,
  );
  mainState._removeSubject.subscribe((value) =>
    value ? console.log(value) : null,
  );
  mainState._arrowLeftSubject.subscribe((value) =>
    value ? console.log(value) : null,
  );
  mainState._arrowRightSubject.subscribe((value) =>
    value ? console.log(value) : null,
  );
  mainState._controlPolygonsSubject.subscribe((value) =>
    value ? console.log(value) : null,
  );
  mainState._curvesSubject.subscribe((value) =>
    value ? console.log(value) : null,
  );
  new P5(sketch);
});
