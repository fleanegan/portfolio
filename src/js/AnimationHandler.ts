import {Point} from "./mathUtils";
import {AnimationNudge, CustomAnimation, Mode, Vapor} from "./Animation";
import {GameObject} from "./GameObject";
import {Locomotive} from "./Locomotive";

export class AnimationHandler {
    private animations: CustomAnimation[] = [];
    private timeOfLastVapor: Date;
    private locomotive: Locomotive;

    constructor() {
    }

    init(nudgeCenter: Point, locomotive: Locomotive) {
        this.locomotive = locomotive;
        let p0 = nudgeCenter;
        const p1 = new Point(p0.x - 12, p0.y + 12);
        p0 = new Point(p1.x + 24, p1.y - 24);
        const p2 = new Point(p0.x, p0.y);

        this.animations.push(new AnimationNudge(new GameObject(p0), new GameObject(p1), 5000, "Drag me!", Mode.Loop));
        this.animations[0].activate(new Date().getTime());
        this.timeOfLastVapor = new Date();
    }

    expulseVapor(){
        if (this.locomotive.shouldExpulseVapor()){
            this.timeOfLastVapor = new Date();
            this.addAnimation(new Vapor(new GameObject(this.locomotive.getCoordinatesOfChimney()), 6000, Mode.Normal));
        }
    }

    run(context: CanvasRenderingContext2D) {
        let animation: CustomAnimation;

        this.expulseVapor();
        for (let i = 0; i < this.animations.length; i++) {
            animation = this.animations[i];
            if (animation.isActivated())
                animation.run(new Date().getTime(), context);
            if (animation.isDone())
                this.animations.splice(i, 1);
        }
    }

    deactivateHelp() {
        this.animations[0].pause();
    }

    updateZoom() {
        this.animations.forEach((animation) => {
            if (animation.isActivated()) {
                animation.updateZoom();
            }
        });
    }

    addAnimation(customAnimation: CustomAnimation) {
        customAnimation.activate(new Date().getTime());
        this.animations.push(customAnimation);
    }

    getAnimations() {
        return this.animations;
    }
}