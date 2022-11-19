import {} from "./mathUtils";
import {CustomAnimation, Mode} from "./Animation";

describe('Animation', () => {
    it('should return zero if calling run with t0', function () {
        let animation = new CustomAnimation(1, 0);

        animation.run(0);

        expect(animation.getProgress()).toBe(0);
        expect(animation.isActivated).toBe(false);
    });

    it('should do nothing if not activated', function () {
        let animation = new CustomAnimation(0, 0);

        animation.run(123);

        expect(animation.getProgress()).toBe(0);
    });

    it('should return 1 if t is bigger than t1', function () {
        let animation = new CustomAnimation(0, 0);
        animation.isActivated = true;

        animation.run(123);

        expect(animation.getProgress()).toBe(1);
    });

    it('should return active if t >= 1', function () {
        let animation = new CustomAnimation(0, 0);
    animation.isActivated = true;

        animation.run(123);

        expect(animation.isActivated).toBe(true);
    });

    it('should be active and 1 if t = 0.5 and in loopmode', function () {
        let animation = new CustomAnimation(3, 0, Mode.Loop);
    animation.isActivated = true;

        animation.run(1.5);

        expect(animation.isActivated).toBe(true);
        expect(animation.getProgress()).toBe(1);
    });

    it('should be active and 0 if t = t1 and in loopmode', function () {
        let animation = new CustomAnimation(3, 0, Mode.Loop);
        animation.isActivated = true;

        animation.run(3);

        expect(animation.isActivated).toBe(true);
        expect(animation.getProgress()).toBe(0);
    });

    it('should be active and 1 if t = 1.5 * t1 and in loopmode', function () {
        let animation = new CustomAnimation(3, 0, Mode.Loop);
        animation.isActivated = true;

        animation.run(4.5);

        expect(animation.isActivated).toBe(true);
        expect(animation.getProgress()).toBe(1);
    });

    it('should be active and 0.5 if t = 1.25 * t1 and in loopmode', function () {
        let animation = new CustomAnimation(3, 0, Mode.Loop);
        animation.isActivated = true;

        animation.run(3.75);

        expect(animation.isActivated).toBe(true);
        expect(animation.getProgress()).toBe(0.5);
    });
});