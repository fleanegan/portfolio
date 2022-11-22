import {Point} from "./mathUtils";
import {DragItem} from "./Background";
import {Scaler} from "./utils";
import {GameObject} from "./GameObject";
import Game from "./Game";

export enum Mode {
    Deactivated = -1,
    Normal,
    Loop,
    Paused,
}

export class CustomAnimation {
    private lastTimeStamp: number = 0;
    protected timeStampOnStartInMs: number = 0;
    private mode: Mode = Mode.Paused;

    constructor(protected durationInMs: number, private targetMode: Mode = Mode.Normal) {
        this.mode = Mode.Paused;
    }

    run(currentTimeInMs: number, context?: CanvasRenderingContext2D) {
        if (this.mode === Mode.Deactivated || this.mode === Mode.Paused)
            return;
        if (this.mode === Mode.Normal)
        {
            this.lastTimeStamp = (currentTimeInMs - this.timeStampOnStartInMs) / this.durationInMs;
            if (this.lastTimeStamp > 1) {
                this.lastTimeStamp = 1;
                this.mode = Mode.Deactivated;
            }
        }
        else if (this.mode === Mode.Loop) {
            const t = (currentTimeInMs - this.timeStampOnStartInMs) % this.durationInMs;
            this.lastTimeStamp = (2 * t) / this.durationInMs;
            if (t > this.durationInMs / 2)
                this.lastTimeStamp = 2 - this.lastTimeStamp;
        }
    }

    getProgress(): number {
        return this.lastTimeStamp;
    }

    activate(timeStampOnStartInMs: number) {
        this.timeStampOnStartInMs = timeStampOnStartInMs;
        this.mode = this.targetMode;
    }

    isActivated(){
        return this.mode !== Mode.Deactivated && this.mode != Mode.Paused;
    }

    isDone(){
        return this.mode === Mode.Deactivated;
    }

    deactivate() {
        this.mode = Mode.Deactivated;
    }

    updateZoom() {
        throw new Error("implement me");
    }

    pause() {
        this.mode = Mode.Paused;
    }
}

export class AnimationNudge extends CustomAnimation{
    currentPoint: GameObject = new GameObject((new Point(0, 0)));
    private obj: DragItem;

    constructor(private start: GameObject, private end: GameObject, durationInMs: number, private message: string, mode: Mode = Mode.Normal) {
        super(durationInMs, mode);
        this.obj = new DragItem(start.center, {strokeColor: "#ff0000", fillColor: "#000000", lineWidth: 5});
    }

    updateZoom() {
        this.obj.updateZoom();
        this.start.updateZoom();
        this.end.updateZoom();
    }

    run(currentTimeInMilliseconds: number, context: CanvasRenderingContext2D) {
        if (! this.isActivated())
            return;
        super.run(currentTimeInMilliseconds);
        this.currentPoint.center.x = this.start.center.x + Math.round((this.end.center.x - this.start.center.x) * this.getProgress());
        this.currentPoint.center.y = this.start.center.y + Math.round((this.end.center.y - this.start.center.y) * this.getProgress());
        this.obj.setCenter(this.currentPoint.center);
        this.obj.draw(context);
        context.font = Scaler.xLimited(1, 0.75, 3) * 20 +"px monospace";
        context.fillText(this.message, this.end.center.x - 64, this.end.center.y + 32);
    }
}

export class Vapor extends CustomAnimation{
    private obj: GameObject;
    private end: GameObject;

    constructor(private start: GameObject, durationInMs: number, mode: Mode = Mode.Normal) {
        const endPoint = new Point(start.center.x, start.center.y);

        super(durationInMs, mode);
        this.obj = new GameObject(start.center);
        this.end = new GameObject(endPoint);
    }

    updateZoom() {
        this.obj.updateZoom();
    }

    run(currentTimeInMilliseconds: number, context: CanvasRenderingContext2D) {
        if (! this.isActivated())
            return;
        super.run(currentTimeInMilliseconds);
        this.obj.center.x = this.start.center.x;
        this.obj.center.y = this.start.center.y - (3 * this.getProgress()) * (3 * this.getProgress());
        context.shadowBlur = 0;
        context.fillStyle = "#ffffff";
        context.strokeStyle = "#ffffff";
        context.shadowColor = "#ffffff";
        context.beginPath();
        context.globalAlpha = 0.5 - this.getProgress() / 2;
        context.arc(this.obj.center.x, this.obj.center.y, 128 * this.getProgress(), 0, 2 * Math.PI, false);
        context.fill();
        context.globalAlpha = 1;
    }
}