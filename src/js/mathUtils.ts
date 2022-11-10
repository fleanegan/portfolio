export class Point {
    constructor(public x: number,
                public y: number) {
    }

    static fromArr(input: number[]) {
        return new Point(input[0], input[1]);
    }

    distanceTo(other: Point) {
        let y = this.y - other.y;
        let x = this.x - other.x;

        return Math.sqrt(y * y + x * x);
    }
}

export function getIndexOfClosestValue(point: Point, outOf: number[][]): number{
    const closest = outOf.reduce((a, b) => {
        return Math.abs(b[0] - point.x) +
        Math.abs(b[1] - point.y)
        < Math.abs(a[0] - point.x) +
        Math.abs(a[1] - point.y)
            ? b : a;
    });
    return outOf.indexOf(closest);
}

function calcNormedPerpendicularVector(x: number, y: number, rotator: Function) {
    let result: number[] = rotator(x, y);
    let length = Math.sqrt(y * y + x * x) as number;
    result[0] /= length;
    result[1] /= length;
    return result;
}

function generateVector(p0: number[], p1: number[]) {
    let p0x: number = p0[0];
    let p0y: number = p0[1];
    let p1x: number = p1[0];
    let p1y: number = p1[1];
    let vx: number = p1x - p0x;
    let vy: number = p1y - p0y;
    return {vx, vy};
}

function rotateLeft(x: number, y: number) {
    return [-y, x];
}

function rotateRight(x: number, y: number) {
    return [y, -x];
}

export function generateOffsetCurvePositive(inputCurve: number[][], offsetDistance: number): number[][] {
    return generateOffsetCurve(inputCurve, offsetDistance, rotateLeft);
}

export function generateOffsetCurveNegative(inputCurve: number[][], offsetDistance: number): number[][] {
    return generateOffsetCurve(inputCurve, offsetDistance, rotateRight);
}

export function generateOffsetCurve(inputCurve: number[][], offsetDistance: number, rotator: Function): number[][] {

    let result: number[][] = [];

    for (let i: number = 0; i < inputCurve.length - 1; i++) {
        let p0: number[] = inputCurve[i];
        let p1: number[] = inputCurve[i + 1];
        let {vx, vy} = generateVector(p0, p1);
        let rotatedVector = calcNormedPerpendicularVector(vx, vy, rotator);
        rotatedVector[0] *= offsetDistance;
        rotatedVector[1] *= offsetDistance;
        rotatedVector[0] += p0[0];
        rotatedVector[1] += p0[1];
        result.push(rotatedVector);
    }
    return result;
}