import { IItemParams } from './Item';
import MouseFollower from './MouseFollower';

const radius = 10.0;

export default class MouseFollowingCircle extends MouseFollower {
    constructor(params: IItemParams) {
        super(params);
    }

    draw(canvas: HTMLCanvasElement): void {
        const context = canvas.getContext('2d');

        if (!context) {
            console.error('Could not get context');
            return;
        }

        context.beginPath();
        context.arc(this._position.x, this._position.y, radius, 0, 2 * Math.PI);
        context.fillStyle = 'blue';
        context.fill();
    }
}