import {getIndexOfClosestValue, Point} from "./mathUtils";

describe('Rail', () => {
    let arr: number[][];

    beforeEach(() => {
        arr = [[0, 0], [1, 1], [2, 10], [2, 2]];
    });


    it('calculating the index of the closest value to max returns index of max', function () {
        let result: number = getIndexOfClosestValue(new Point(1.9, 1.9), arr);

        expect(arr[result][0]).toBe(2);
        expect(arr[result][1]).toBe(2);
        expect(result).toBe(3);
    });
});


