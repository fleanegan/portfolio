import {} from "./mathUtils";
import {CustomAnimation} from "./Animation";

class MockCustomAmination extends CustomAnimation {
    constructor(durationInSeconds: number, timeStampOnStartInSeconds: number) {
        super(durationInSeconds, timeStampOnStartInSeconds);
    }
}

describe('Animation', () => {
    it('should return zero if calling run with t0', function () {
        let animation = new MockCustomAmination(1, 0);

        animation.run(0);

        expect(animation.getProgress()).toBe(0);
    });

    it('should return 1 if t is bigger than t1', function () {
        let animation = new MockCustomAmination(0, 0);

        animation.run(123);

        expect(animation.getProgress()).toBe(1);
    });
});