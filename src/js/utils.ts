export class Scaler {
    static x(input: number): number {
        return input * window.innerWidth / 2144;
    }

    static y(input: number): number {
        return input * window.innerHeight / 1206;
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
}