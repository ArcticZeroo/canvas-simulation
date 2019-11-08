import Duration from '@arcticzeroo/duration';
import IDrawable from './IDrawable';
import ISimulation from './models/ISimulation';
import Simulation from './Simulation';
import Vector from './Vector';

export interface IItemParams {
    simulation: ISimulation;
    position?: Vector;
    velocity?: Vector;
}

export default abstract class Item implements IDrawable {
    protected _simulation: ISimulation;
    protected _position: Vector;
    protected _velocity: Vector;

    public get position() {
        return this._position.copy();
    }

    public get velocity() {
        return this._velocity.copy();
    }

    protected constructor({simulation, position = Simulation.canvasSize.multiplyScalar(0.5), velocity = new Vector(0, 0)}: IItemParams) {
        this._simulation = simulation;
        this._position = position;
        this._velocity = velocity;
    }

    public abstract draw(canvas: HTMLCanvasElement): void;

    public update(elapsedTime: Duration): void {
        const elapsedTimeInSeconds = elapsedTime.inMilliseconds / Duration.microsecondsPerSecond;
        const positionDelta = this._velocity.multiplyScalar(elapsedTimeInSeconds);
        this._position = this._position.add(positionDelta);
    }
}