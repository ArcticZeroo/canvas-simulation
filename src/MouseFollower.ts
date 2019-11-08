import Item, { IItemParams } from './Item';
import Vector from './Vector';

export default abstract class MouseFollower extends Item {
    protected constructor(params: IItemParams) {
        super(params);

        this._simulation.on('mouseMove', ({x, y}) => {
            this._position = new Vector(x, y);
        });
    }
}