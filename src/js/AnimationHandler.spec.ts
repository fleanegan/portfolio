import {} from "./mathUtils";
import {CustomAnimation, Mode} from "./Animation";
import {AnimationHandler} from "./AnimationHandler";
// jest.mock('./Animation');

describe('AnimationHandler', () => {
    let aH: AnimationHandler;

    beforeEach(() => {
        aH = new AnimationHandler();
    });

    it('should remove a deactivated Animation', function () {
        let animation = new CustomAnimation(1000, Mode.Normal);
        aH.addAnimation(animation);
        animation.deactivate();

        aH.run(null);

        expect(aH.getAnimations().length).toBe(0);
    });
});