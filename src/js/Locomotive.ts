import {Rails} from "./Background";
import {getIndexOfClosestValue, Point} from "./mathUtils";
import icon from '../../assets/locomotive.png'
import {Scaler} from "./utils";

export enum Direction {
    Forward = 1,
    Idle = 0,
    Backwards = -1
}

export class Locomotive {
    private trainProgress: number = 0;
    private offset: Point;
    private img: HTMLImageElement;
    private velocity = 0;

    move(direction: Direction) {
        if (Direction.Idle == direction) {
            this.velocity *= 0.95;
        } else if (Math.abs(this.velocity) <= 0.002) {
            this.velocity += 0.00025 * direction;
        }
        let normalizedPathLength = this.trainProgress + this.velocity;
        this.trainProgress = this.truncateNormalizedPathLength(normalizedPathLength);
    }

    constructor(public rails: Rails, private length: number) {
        this.offset = new Point(0, 0);
        this.img = new Image();
        this.img.src = icon;
    }

    private truncateNormalizedPathLength(normalizedPathLength: number) {
        let result = normalizedPathLength;
        const maxProgressWithoutTrainFallingOffTheRails = 1 - this.rails.pxToNormalized(this.length) * 1.35;

        if (result < 0)
            result = 0;
        if (result >= maxProgressWithoutTrainFallingOffTheRails)
            result = maxProgressWithoutTrainFallingOffTheRails;
        return result;
    }

    setGlobalOffset(offset: Point) {
        this.offset = offset;
    }

    localPosToGlobal(local: Point) {
        return new Point(
            this.offset.x + local.x,
            this.offset.y + local.y,
        );
    }

    getPositionOnScreen(): Point[] {
        let result: Point[] = [];
        let rearWheels = this.rails.getInterpolatedTrainPosition(this.trainProgress + this.getTrainLengthAsNormalizedPathLength() * 0.35);
        let indexOfRearWheels = getIndexOfClosestValue(rearWheels, this.rails.curve);
        let frontWheels = Point.fromArr(this.rails.curve[indexOfRearWheels]);

        function indexOfFrontWheelsForStraightLine() {
            return Math.round(this.rails.pxToNormalized(this.length) * this.rails.interpolator.length * 0.6);
        }

        let i: number = indexOfFrontWheelsForStraightLine.call(this) ;
        while (frontWheels.distanceTo(rearWheels) < this.length * 0.6) {
            if (indexOfRearWheels + i < this.rails.curve.length)
                frontWheels = Point.fromArr(this.rails.curve[indexOfRearWheels + i])
            else
                break;
            i++;
        }
        result.push(this.localPosToGlobal(rearWheels));
        result.push(this.localPosToGlobal(frontWheels));
        return result;
    }

    private getTrainLengthAsNormalizedPathLength() {
        return this.rails.pxToNormalized(this.length);
    }

    draw(context: CanvasRenderingContext2D) {
        let currentPos = this.getPositionOnScreen();
        let angleInRadians = Math.atan2(currentPos[1].y - currentPos[0].y, currentPos[1].x - currentPos[0].x);
        let scaledHeight = this.img.height * this.length / this.img.width;

        context.translate(currentPos[0].x, currentPos[0].y);
        context.rotate(angleInRadians);
        context.drawImage(this.img, 0, -scaledHeight / 2, this.length, scaledHeight);
        context.rotate(-angleInRadians);
        context.translate(-currentPos[0].x, -currentPos[0].y);
    }

    scaleLength(newScalefactor: number) {
        this.length = Math.round(175 * newScalefactor);
    }
}