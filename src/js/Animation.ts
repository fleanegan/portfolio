import {Point} from "./mathUtils";
import {DragItem} from "./Background";

export enum Mode {
    Loop,
    Normal,
    Paused,
}

export class CustomAnimation {
    private lastTimeStamp: number = 0;
    protected timeStampOnStartInMs: number = 0;
    private _isActivated: boolean = false;

    constructor(protected durationInMs: number, private mode: Mode = Mode.Normal) {
    }

    run(currentTimeInMs: number, context?: CanvasRenderingContext2D) {
        if (this._isActivated === false)
            return;
        if (this.mode === Mode.Normal)
        {
            this.lastTimeStamp = (currentTimeInMs - this.timeStampOnStartInMs) / this.durationInMs;
            if (this.lastTimeStamp > 1) {
                this.lastTimeStamp = 1;
                this._isActivated = true;
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
        this._isActivated = true;
    }

    isActivated(){
        return this._isActivated;
    }


    deactivate() {
        this._isActivated = false;
    }
}

export class AnimateLinearButton extends CustomAnimation{
    currentPoint: Point = new Point(0, 0);
    private obj: DragItem;

    constructor(private start: Point, private end: Point, durationInMs: number, mode: Mode = Mode.Normal) {
        super(durationInMs, mode);
        this.obj = new DragItem(start, {strokeColor: "#ff0000", fillColor: "#000000", lineWidth: 5});
    }

    run(currentTimeInMilliseconds: number, context: CanvasRenderingContext2D) {
        if (! this.isActivated())
            return;
        super.run(currentTimeInMilliseconds);
        this.currentPoint.x = this.start.x + Math.round((this.end.x - this.start.x) * this.getProgress());
        this.currentPoint.y = this.start.y + Math.round((this.end.y - this.start.y) * this.getProgress());
        this.obj.setCenter(this.currentPoint);
        this.obj.draw(context)
    }
}