import {Path} from "./Background";
import {getIndexOfClosestValue, Point} from "./mathUtils";
import icon from '../../assets/locomotive.png'

export enum Direction {
    FastBackwards = -1.01,
    Backwards = -1,
    Idle = 0,
    Forward = 1,
    FastForward = 1.01,
    Auto,
}

export class Locomotive {
    private trainProgress: number = 0;
    private offset: Point;
    private img: HTMLImageElement;
    private velocity = 0;
    autopilotVelocity: number;
    private autopilotDestinationAsProgress: number | null = null;

    constructor(public path: Path, private length: number) {
        this.offset = new Point(0, 0);
        this.img = new Image();
        this.img.src = icon;
        this.autopilotVelocity = 0;
    }

    private hasReachedDestination(): boolean{
        if (this.autopilotVelocity > 0)
            return this.trainProgress + this.velocity + this.getTrainLengthAsNormalizedPathLength() >= this.autopilotDestinationAsProgress;
        return this.trainProgress + this.velocity + this.getTrainLengthAsNormalizedPathLength() <= this.autopilotDestinationAsProgress;
    }

    move(direction: number) {
        if (this.autopilotDestinationAsProgress != null){
            const old = this.autopilotDestinationAsProgress;
            if (Math.abs(this.velocity) <= Math.abs(this.autopilotVelocity))
                this.velocity += 0.001 * Math.sign(this.autopilotVelocity);
            if (this.hasReachedDestination()) {
                this.autopilotVelocity = 0;
                this.autopilotDestinationAsProgress = null;
                this.velocity = 0;
            }
        }
        else{
            if (Direction.Idle == direction) {
                this.velocity *= 0.95;
            } else if (Math.abs(this.velocity) <= 0.002) {
                this.velocity += 0.00025 * direction;
            }
        }
        let normalizedPathLength = this.trainProgress + this.velocity;
        this.trainProgress = this.truncateNormalizedPathLength(normalizedPathLength);
    }

    setDestination(destination: Point) {
        this.autopilotDestinationAsProgress = getIndexOfClosestValue(destination, this.path.getPoints()) / this.path.getPoints().length;
        let difference = this.autopilotDestinationAsProgress - this.trainProgress;
        this.autopilotVelocity = difference / 10;
        console.log("auto destination " + destination.x, destination.y);
    }

    calcAxlePositions(): Point[] {
        let result: Point[] = [];
        let proportionsWheel = 0.3;
        let indexRearWheels = this.calcIndexRearWheels();
        let rearWheels = Point.fromArr(this.path.getPoints()[indexRearWheels]);
        let frontWheels = Point.fromArr(this.path.getPoints()[indexRearWheels]);
        let i: number = this.indexOfFrontWheelsForStraightLine(indexRearWheels, proportionsWheel);

        while (frontWheels.distanceTo(rearWheels) < this.length * proportionsWheel
        && i < this.path.getPoints().length) {
            frontWheels = Point.fromArr(this.path.getPoints()[i])
            i++;
        }
        result.push(this.localPosToGlobal(rearWheels));
        result.push(this.localPosToGlobal(frontWheels));
        return result;
    }

    setGlobalOffset(offset: Point) {
        this.offset = offset;
    }

    localPosToGlobal(local: Point) {
        return new Point(
            Math.round(this.offset.x + local.x),
            Math.round(this.offset.y + local.y),
        );
    }

    calcIndexRearWheels(): number {
        let progressRearWheels = this.truncateNormalizedPathLength(
            this.trainProgress + this.getTrainLengthAsNormalizedPathLength());
        return Math.round(progressRearWheels * this.path.getPoints().length);

    }

    indexOfFrontWheelsForStraightLine(indexRearWheels: number, proportionsWheelsToLength: number): number {
        let result = Math.round(this.path.pxToNormalized(this.length) * this.path.interpolator.length * proportionsWheelsToLength);

        result += indexRearWheels;
        if (result >= this.path.getPoints().length)
            result -= this.path.getPoints().length;
        return result;
    }

    draw(context: CanvasRenderingContext2D) {
        let currentPos = this.calcAxlePositions();
        let angleInRadians = Math.atan2(currentPos[1].y - currentPos[0].y, currentPos[1].x - currentPos[0].x);
        let scaledHeight = Math.round(this.img.height * this.length / this.img.width);

        context.translate(currentPos[0].x, currentPos[0].y);
        context.rotate(angleInRadians);
        context.drawImage(this.img, -this.length * 0.25, -scaledHeight / 2, this.length, scaledHeight);
        context.rotate(-angleInRadians);
        context.translate(-currentPos[0].x, -currentPos[0].y);
    }

    scaleLength(newScalefactor: number) {
        this.length = Math.round(175 * newScalefactor);
    }

    private truncateNormalizedPathLength(normalizedPathLength: number) {
        let result = normalizedPathLength;

        if (result < 0)
            result += 1;
        if (result >= 1)
            result -= 1;
        return result;
    }

    private getTrainLengthAsNormalizedPathLength() {
        return this.path.pxToNormalized(this.length);
    }
}