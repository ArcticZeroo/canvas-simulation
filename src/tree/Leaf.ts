import Item, { IItemParams } from '../Item';

const seed = 'some seed';

interface ILeafParams extends IItemParams {
    width: number;
    height: number;
    bulge: number;
    curve: number;
    darkness: number;
    veinFrequency: number;
}

declare global {
    interface Math {
        seedrandom(seed: string): void;
    }
}

export default class Leaf extends Item {
    private readonly params: ILeafParams;

    constructor(params: ILeafParams) {
        super(params);
        this.params = params;
    }

    draw(canvas: HTMLCanvasElement): void {
        Math.seedrandom(seed);


    }
}