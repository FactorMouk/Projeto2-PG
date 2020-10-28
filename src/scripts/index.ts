import P5 from 'p5';

const sketch = (p5: P5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(1024, 768);
    canvas.parent('canvas-container');
  };
  p5.draw = () => {
    p5.background(255);
  };
};

new P5(sketch);
