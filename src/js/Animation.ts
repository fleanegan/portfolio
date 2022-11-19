export enum Mode {
    Loop,
    Normal,
    Paused,
}

export class CustomAnimation {
    private lastTimeStamp: number = 0;
    isActivated: boolean = false;

    constructor(private durationInSeconds: number, private timeStampOnStartInSeconds: number, private mode: Mode = Mode.Normal) {
    }

    run(currentTimeInSeconds: number) {
        if (this.isActivated === false)
            return;
        if (this.mode === Mode.Normal)
        {
            this.lastTimeStamp = (currentTimeInSeconds - this.timeStampOnStartInSeconds) / this.durationInSeconds;
            if (this.lastTimeStamp > 1) {
                this.lastTimeStamp = 1;
                this.isActivated = true;
            }
        }
        else if (this.mode === Mode.Loop) {
            const t = (currentTimeInSeconds - this.timeStampOnStartInSeconds) % this.durationInSeconds;
            this.lastTimeStamp = (2 * t) / this.durationInSeconds;
            if (t > this.durationInSeconds / 2)
                this.lastTimeStamp = 2 - this.lastTimeStamp;
        }
    }

    getProgress(): number {
        return this.lastTimeStamp;
    }
}

export class AnimateLinearButton {

}