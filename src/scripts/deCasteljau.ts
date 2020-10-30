import p5 from 'p5';
import Point from './point';

export default function deCasteljau(
  controlPoints: Array<Point>,
  t: number,
  P5: p5,
): Point {
  const len = controlPoints.length;
  if (len === 1) {
    return controlPoints[0];
  } else {
    const p: Array<Point> = [];
    for (let i = 0; i < len - 1; i++) {
      const p1 = controlPoints[i],
        p2 = controlPoints[i + 1];
      //   p.push([(1 - t) * p1.x + t * p2.x, (1 - t) * p1.y + t * p2.y]);
      p.push(
        new Point(
          (1 - t) * p1.x + t * p2.x,
          (1 - t) * p1.y + t * p2.y,
          P5,
          'curve',
        ),
      );
    }
    return deCasteljau(p, t, P5);
  }
}
