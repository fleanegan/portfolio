import {Point} from "./mathUtils";
import {Scaler} from "./utils";

export class GameObject {
    unScaledCenter: Point;

    constructor(public center: Point) {
        this.unScaledCenter = new Point(center.x / Scaler.x(1), center.y / Scaler.y(1));
    }

    setCenter(newCenter: Point) {
        this.center = newCenter;
        this.center.x;
        this.center.y;
        this.unScaledCenter.x = newCenter.x / Scaler.x(1);
        this.unScaledCenter.y = newCenter.y / Scaler.y(1);
    }

    updateZoom() {
        this.center.x = Scaler.x(this.unScaledCenter.x);
        this.center.y = Scaler.y(this.unScaledCenter.y);
    }
}