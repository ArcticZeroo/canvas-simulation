export default interface IDrawable {
    draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void;
}