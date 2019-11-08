import Color from '../Color';
import Item, { IItemParams } from '../Item';
import DrawUtil from '../util/DrawUtil';
import Vector from '../Vector';

const seed = 'some';

interface ILimbParams extends IItemParams {
    width: number;
    height: number;
    baseBulge: number;
    taper: number;
    darkness: number;
    knotFrequency: number;
    colorVariance: number;
    wobbleDeltaLength: number;
    wobbleMagnitude: number;
}

const baseColor = new Color(156, 122, 69);

declare global {
    interface Math {
        seedrandom(seed: string): void;
    }
}

export default class Limb extends Item {
    private readonly params: ILimbParams;

    constructor(params: ILimbParams) {
        super(params);
        this.params = params;
        this._position = new Vector(this._position.x, this._position.y + (params.height / 2));
    }

    draw(canvas: HTMLCanvasElement): void {
        const context = canvas.getContext('2d');

        if (!context) {
            return;
        }

        // Math.seedrandom(seed);

        const { width, height, taper, colorVariance, knotFrequency, darkness, baseBulge } = this.params;

        const taperedWidth = width * taper;

        const color = new Color(
            baseColor.r + Limb.getVariedRandom(colorVariance) - darkness,
            baseColor.g + Limb.getVariedRandom(colorVariance) - darkness,
            baseColor.b + Limb.getVariedRandom(colorVariance) - darkness
        );
        context.fillStyle = color.cssString;

        context.translate(this._position.x, this._position.y);
        context.rotate(Math.PI);

        const topLeft = new Vector(-taperedWidth / 2, height);
        const topRight = new Vector(taperedWidth / 2, height);
        const bottomLeft = new Vector(-width / 2, 0);
        const bottomRight = new Vector(width / 2, 0);

        this.drawPath(context, [topLeft, topRight, bottomRight, bottomLeft]);

        context.fill();

        if (knotFrequency > 0) {
            const limbHasKnot = Math.random() <= knotFrequency;

            if (limbHasKnot) {
                const knotPositionY = Math.random() * height;
            }
        }

        if (baseBulge > 1) {

        }

    }

    private drawPath(context: CanvasRenderingContext2D, points: Vector[]) {
        if (!points || !points.length) {
            return;
        }

        const {wobbleDeltaLength, wobbleMagnitude, taper} = this.params;

        const [startingPoint] = points;
        points.push(startingPoint);

        context.beginPath();
        context.moveTo(startingPoint.x, startingPoint.y);

        for (let i = 1; i < points.length; ++i) {
            DrawUtil.wobbleLine(context, points[i - 1], points[i], wobbleDeltaLength, wobbleMagnitude * taper);
        }

        context.closePath();
    }

    private static getVariedRandom(variance: number) {
        return (Math.random() * variance) - (variance / 2);
    }
}