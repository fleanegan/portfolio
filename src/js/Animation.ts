export class CustomAnimation {
    private lastTimeStamp: number = 0;
    constructor(private durationInSeconds: number, private timeStampOnStartInSeconds: number) {
    }

    run(currentTimeInSeconds: number) {
        this.lastTimeStamp = (currentTimeInSeconds - this.timeStampOnStartInSeconds) / this.durationInSeconds;
        if (this.lastTimeStamp > 1)
            this.lastTimeStamp = 1;
    }

    getProgress(): number{
        return this.lastTimeStamp;
    }
}