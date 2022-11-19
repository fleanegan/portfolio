export class Scaler {
    private static height: number | null = null;
    private static width: number | null = null;

    static x(input: number): number {
        return input * Scaler.getWidth() / 2144;
    }

    static y(input: number): number {
        return input * Scaler.getHeight() / 1206;
    }

    static xLimited(input: number, min: number = 0.75, max:number = 3): number{
        let scaleFactor = Scaler.x(input);
        if (scaleFactor < min)
            scaleFactor = min;
        if (scaleFactor > max)
            scaleFactor = max;
        return scaleFactor;
    }

    static yLimited(input: number, min: number = 0.75, max:number = 3): number{
        let scaleFactor = Scaler.y(input);
        if (scaleFactor < min)
            scaleFactor = min;
        if (scaleFactor > max)
            scaleFactor = max;
        return scaleFactor;
    }

    static getHeight(): number{
        if (Scaler.height === null)
            Scaler.height = document.getElementById('canvas').getBoundingClientRect().height;
        return Scaler.height;
    }

    static getWidth(): number{
        if (Scaler.width === null)
            Scaler.width = document.getElementById('canvas').getBoundingClientRect().width;
        return Scaler.width;
    }

    static updateDimensions() {
        Scaler.width = document.getElementById('canvas').getBoundingClientRect().width;
        Scaler.height = document.getElementById('canvas').getBoundingClientRect().height;
    }
}