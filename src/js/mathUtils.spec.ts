import {generateOffsetCurveNegative, generateOffsetCurvePositive} from './mathUtils';

describe('offsetCurve', () => {
    it('should create a perpendicular vector if only two points are present', function () {
        let input: number[][] = [[0, 0], [1, 0]];

        let result: number[][] = generateOffsetCurvePositive(input, 1);

        expect(result.length).toBe(1);
        expect(result[0][0] === 0).toBeTruthy();
        expect(result[0][1]).toBe(1);
    });

    it('offfet in negative sense of rotation', function () {
        let input: number[][] = [[0, 0], [1, 0]];

        let result: number[][] = generateOffsetCurveNegative(input, 1);

        expect(result.length).toBe(1);
        expect(result[0][0] === 0).toBeTruthy();
        expect(result[0][1]).toBe(-1);
    });

    it('should create a perpendicular vector also in negative quadrant', function () {
        let input: number[][] = [[0, 0], [1, -1]];

        let result: number[][] = generateOffsetCurvePositive(input, 1);

        expect(Math.abs(result[0][0])).toBeCloseTo(Math.abs(result[0][1]));
        expect(Math.sqrt(result[0][0] * result[0][0] + result[0][1] * result[0][1])).toBeCloseTo(1);
        expect(result[0][0]).toBeGreaterThan(0);
        expect(result[0][1]).toBeGreaterThan(0);
    });

    it('should create two perpendicular vectors if passing three points', function () {
        let input: number[][] = [[0, 0], [1, 0], [2, 0]];

        let result: number[][] = generateOffsetCurvePositive(input, 1);

        expect(result.length).toBe(2);
        expect(result[0][0] === 0).toBeTruthy();
        expect(result[0][1]).toBe(1);
        expect(result[1][0]).toBe(1);
        expect(result[1][1]).toBe(1);
    });

    it('passing distance parameter sets offset distance', function () {
        let input: number[][] = [[0, 0], [0.1, 0.1]];

        let result: number[][] = generateOffsetCurvePositive(input, 3);


        expect(Math.abs(result[0][0])).toBeCloseTo(Math.abs(result[0][1]));
        expect(Math.sqrt(result[0][0] * result[0][0] + result[0][1] * result[0][1])).toBeCloseTo(3);
    });
});