import {Path} from "./Background";
import {getIndexOfClosestValue, Point} from "./mathUtils";
import icon from '../../assets/locomotive.png'
// import icon from '../../assets/maschinenbau/x_act.png'


export enum Direction {
    Backwards = -1,
    Idle = 0,
    Forward = 1,
    Auto,
}

export class Locomotive {
    private trainProgress: number = 0.12;
    private oldTrainProgress: number = this.trainProgress;
    private img: HTMLImageElement;
    private velocity = 0;
    private autopilotVelocity: number = 0;
    autopilotDestinationAsProgress: number | null = null;
    direction: Direction = Direction.Idle;
    private timeOfLastVapor: Date;
    private maxVelocity: number = 0.003;

    constructor(public path: Path, private length: number) {
        this.img = new Image();
        this.img.src = icon;
        this.timeOfLastVapor = new Date();
    }

    hasReachedDestination(): boolean {
        let oldProgress: number;
        let newProgress: number;

        if (this.autopilotDestinationAsProgress === null)
            return true;
        if (this.velocity < 0) {
            newProgress = this.truncateNormalizedPathLength(
                this.trainProgress + this.velocity + this.getTrainLengthAsNormalizedPathLength());
            oldProgress = this.truncateNormalizedPathLength(
                this.oldTrainProgress + this.getTrainLengthAsNormalizedPathLength());
        } else {
            oldProgress = this.truncateNormalizedPathLength(this.oldTrainProgress);
            newProgress = this.truncateNormalizedPathLength(this.trainProgress + this.velocity);
        }
        if (this.velocity < 0 && oldProgress < newProgress)
            newProgress -= 1;
        if (this.velocity > 0 && oldProgress > newProgress)
            oldProgress -= 1;
        return (
            oldProgress < this.autopilotDestinationAsProgress) != (newProgress < this.autopilotDestinationAsProgress);
    }

    move() {
        if (this.direction === Direction.Auto) {
            if (Math.abs(this.velocity) <= Math.abs(this.autopilotVelocity))
                this.velocity += 0.001 * Math.sign(this.autopilotVelocity);
        } else {
            if (Direction.Idle === this.direction) {
                this.velocity *= 0.95;
            } else if (Math.abs(this.velocity) <= this.maxVelocity) {
                this.velocity += 0.00025 * this.direction;
            }
        }
        let normalizedPathLength = this.trainProgress + this.velocity;
        this.oldTrainProgress = this.trainProgress;
        this.trainProgress = this.truncateNormalizedPathLength(normalizedPathLength);
    }

    setDestination(destination: Point) {
        this.autopilotDestinationAsProgress = getIndexOfClosestValue(destination, this.path.getPoints()) / this.path.getPoints().length;
        let difference = this.autopilotDestinationAsProgress - this.trainProgress;
        if (difference == 0)
            return;
        if (difference > 1)
            difference -= 1;
        if (difference < 0)
            difference += 1;
        this.autopilotVelocity = difference / 30;
    }

    calcAxlePositions(): Point[] {
        let result: Point[] = [];
        let proportionsWheel = 0.3;
        let indexRearWheels = this.calcIndexRearWheels();
        let rearWheels = Point.fromArr(this.path.getPoints()[indexRearWheels]);
        let indexFrontWheels: number = this.indexOfFrontWheelsForStraightLine(indexRearWheels, proportionsWheel);
        let frontWheels = Point.fromArr(this.path.getPoints()[indexFrontWheels]);

        while (frontWheels.distanceTo(rearWheels) < this.length * proportionsWheel
        && indexFrontWheels < this.path.getPoints().length - 1) {
            frontWheels.x = this.path.getPoints()[indexFrontWheels][0]
            frontWheels.y = this.path.getPoints()[indexFrontWheels][1]
            indexFrontWheels++;
        }
        result.push(rearWheels);
        result.push(frontWheels);
        return result;
    }

    calcIndexRearWheels(): number {
        let progressRearWheels = this.truncateNormalizedPathLength(
            this.trainProgress);
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

    stop() {
        this.autopilotVelocity = 0;
        this.autopilotDestinationAsProgress = null;
        this.velocity = 0;
        this.direction = Direction.Idle;
    }

    getCoordinatesOfChimney(): Point {
        let progressOfChimney: number = this.trainProgress + this.getTrainLengthAsNormalizedPathLength() * 0.5;
        if (progressOfChimney > 1)
            progressOfChimney -= 1;
        const coords = this.path.interpolator.getPointAt(progressOfChimney);
        return new Point(coords[0], coords[1]);
    }

    shouldExpulseVapor():boolean {
        const now: Date = new Date();
        const diff: number = now.getTime() - this.timeOfLastVapor.getTime();
        if (Math.abs(this.velocity) > this.maxVelocity * 0.8 && diff > 50 && this.autopilotDestinationAsProgress == null){
            this.timeOfLastVapor = now;
            return true;
        }
        else if (diff > 1250){
            this.timeOfLastVapor = now;
            return true;
        }
        else
            return false;
    }
}