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
    private trainProgress: number = 0.12;
    private offset: Point;
    private img: HTMLImageElement;
    private velocity = 0;
    private autopilotVelocity: number = 0;
    autopilotDestinationAsProgress: number | null = null;
    direction: Direction = Direction.Idle;
    private oldProg: number = 0;

    constructor(public path: Path, private length: number) {
        this.offset = new Point(0, 0);
        this.img = new Image();
        this.img.src = icon;
    }

    hasReachedDestination(): boolean{
        let oldProgress = this.truncateNormalizedPathLength(this.oldProg + this.getTrainLengthAsNormalizedPathLength());
        let newProgress = this.truncateNormalizedPathLength(this.trainProgress + this.velocity + this.getTrainLengthAsNormalizedPathLength());

        if (this.velocity < 0 && oldProgress < newProgress)
            newProgress -= 1;
        if (this.velocity > 0 && oldProgress > newProgress)
            oldProgress -= 1;
        if ((oldProgress < this.autopilotDestinationAsProgress) != (newProgress <  this.autopilotDestinationAsProgress))
            return true;
        return false;

    }

    move() {
        if (this.direction === Direction.Auto){
            if (Math.abs(this.velocity) <= Math.abs(this.autopilotVelocity))
                this.velocity += 0.001 * Math.sign(this.autopilotVelocity);
            if (this.hasReachedDestination()) {
                this.autopilotVelocity = 0;
                this.autopilotDestinationAsProgress = null;
                this.velocity = 0;
            }
        }
        else{
            if (Direction.Idle === this.direction) {
                this.velocity *= 0.95;
            } else if (Math.abs(this.velocity) <= 0.01) {
                this.velocity += 0.00025 * this.direction;
            }
        }
        let normalizedPathLength = this.trainProgress + this.velocity;
        this.oldProg = this.trainProgress;
        this.trainProgress = this.truncateNormalizedPathLength(normalizedPathLength);
    }

    setDestination(destination: Point) {
        this.autopilotDestinationAsProgress = getIndexOfClosestValue(destination, this.path.getPoints()) / this.path.getPoints().length;
        let difference = this.autopilotDestinationAsProgress - this.trainProgress;
        if (difference == 0)
            return ;
        if (difference > 0.5)
            difference -= 1;
        if (difference < -0.5)
            difference += 1;
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

    setDirection(direction: Direction) {
        this.direction = direction;
    }
}