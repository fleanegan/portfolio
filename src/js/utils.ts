export class Scaler {
    static x(input: number): number {
        return input * window.innerWidth / 2144;
    }

    static y(input: number): number {
        return input * window.innerHeight / 1206;
    }
}