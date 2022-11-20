import {Point} from "./mathUtils";
import {Scaler} from "./utils";
import {DragItem, HighlightMode, Rails} from "./Background";
import {ContentPreview, ContentTile} from "./ContentPreview";

export class RailInteractivityHandler {
    autopilotDestination: ContentTile = null;
    activeDragPoint: DragItem[] = [];

    constructor(private rails: Rails, private contentPreview: ContentPreview) {
        this.updatePath();
    }

    updateZoom() {
        this.rails.splineBasePoints.forEach((item) => {
            item.updateZoom();
        });
        this.contentPreview.updateZoom();
        this.updatePath();
    }

    private updatePath() {
        let tmp: number[][] = [];
        for (const splineBasePoint of this.rails.splineBasePoints) {
            splineBasePoint.updateZoom();
            tmp.push(splineBasePoint.center.toArr());
        }
        this.rails.path.interpolate(tmp);
        this.rails.shouldRedrawRails = true;
    }

    handlePointerDown(pointerPosition: Point) {
        this.selectBasePointToDrag(pointerPosition);
        this.rails.shouldRedrawDraggable = this.isPathDragged();
    }

    handlePointerUp(pointerPosition: Point) {
        if (this.isNearTile(pointerPosition)) {
            this.autoRouteClosestSplineBaseIntoClickedTarget(pointerPosition);
            this.updatePath();
        }
        if (this.isPathDragged()) {
            this.updatePath();
            this.contentPreview.setTargetHightlightMode(HighlightMode.None);
            this.autopilotToSelectedTarget(pointerPosition);
            this.activeDragPoint.pop();
            this.printBasePointCoordinates();
        }
        this.rails.shouldRedrawDraggable = false;
    }

    handlePointerPressedMove(pointerPosition: Point) {
        if (this.isPathDragged()) {
            if (this.isTouchingAnotherSplineBasePoint(pointerPosition))
                return;
            this.contentPreview.setTargetHightlightMode(HighlightMode.Light);
            this.snapPointerToTargetIfNear(pointerPosition);
        }
        this.rails.shouldRedrawDraggable = this.isPathDragged();
    }

    private autopilotToSelectedTarget(pointerPosition: Point) {
        const target: ContentTile[] = this.contentPreview.getTargetsUnderPointer(pointerPosition);
        if (target.length != 0)
            this.autopilotDestination = target[0];
    }

    private autoRouteClosestSplineBaseIntoClickedTarget(pointerPosition: Point) {
        let nearestBasePoint = this.rails.splineBasePoints[0];
        let shortestDistance = Number.MAX_SAFE_INTEGER;
        const targets: ContentTile[] = this.contentPreview.getTileUnderPointer(pointerPosition);

        if (targets.length != 0) {
            this.rails.splineBasePoints.forEach((basePoint) => {
                let distanceToTarget = basePoint.center.distanceTo(targets[0].getDragTargetCenter());

                if (distanceToTarget < shortestDistance) {
                    nearestBasePoint = basePoint;
                    shortestDistance = distanceToTarget;
                }
            })
            nearestBasePoint.setCenter(targets[0].getDragTargetCenter());
            this.autopilotDestination = targets[0];
        }
    }

    private selectBasePointToDrag(pointerPosition: Point) {
        for (let dragItem of this.rails.splineBasePoints) {
            if (dragItem.center.distanceTo(pointerPosition) < DragItem.radius)
                this.activeDragPoint.push(dragItem);
        }
    }

    private printBasePointCoordinates() {
        let print: string = "[";
        this.rails.path.basePoints.forEach((basePoint) => {
            print += '[' + basePoint[0] / Scaler.x(1) + ', ' + basePoint[1] / Scaler.y(1) + '],';
        })
        print += "]";
        console.log(print);
    }

    private snapPointerToTargetIfNear(pointerPosition: Point) {
        this.contentPreview.getTargetsUnderPointer(pointerPosition).forEach((target) => {
            pointerPosition = target.getDragTargetCenter();
            target.setHightlightMode(HighlightMode.Full);
        });
        this.activeDragPoint[0].setCenter(pointerPosition);
        return pointerPosition;
    }

    private isTouchingAnotherSplineBasePoint(pointerPosition: Point) {
        for (const splineBasePoint of this.rails.splineBasePoints) {
            const oldDistance = splineBasePoint.center.distanceTo(this.activeDragPoint[0].center);
            const newDistance = splineBasePoint.center.distanceTo(pointerPosition);
            if (oldDistance > 0 && newDistance < DragItem.radius * 2.5)
                return true;
        }
        return false;
    }

    isPathDragged() {
        let result: boolean = this.activeDragPoint.length != 0;
        return result;
    }

    isNearTile(point: Point): boolean {
         return this.contentPreview.getTileUnderPointer(point).length != 0;
    }
}