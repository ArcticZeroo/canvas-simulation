import {EventEmitter2 as EventEmitter} from 'eventemitter2';
import Duration from '@arcticzeroo/duration';
import Item from './Item';
import ISimulation from './models/ISimulation';
import Vector from './Vector';

const framesPerSecond = 90;
const secondsPerFrame = 1 / framesPerSecond;
const millisecondsPerFrame = secondsPerFrame * Duration.millisecondsPerSecond;

export default class Simulation extends EventEmitter implements ISimulation {
    public static readonly canvasSize = new Vector(500, 500);
    public readonly items: Set<Item>;
    private readonly canvas: HTMLCanvasElement;
    private readonly mouseCoordinateDiv: HTMLDivElement;
    private lastDrawTimeInMs: number = 0;
    private timer: number = 0;

    public constructor(parent?: Element | string | null) {
        super();

        this.items = new Set<Item>();

        this.canvas = document.createElement('canvas');
        this.canvas.width = Simulation.canvasSize.x;
        this.canvas.height = Simulation.canvasSize.y;

        if (parent) {
            if (typeof parent === 'string') {
                parent = document.querySelector(parent);
            }
        } else {
            parent = document.body;
        }

        if (!parent) {
            throw new Error('Parent is unavailable');
        }

        this.mouseCoordinateDiv = document.createElement('div');

        parent.appendChild(this.canvas);
        parent.appendChild(this.mouseCoordinateDiv);

        this.setupCanvasEvents();
    }

    public start() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        // this.timer = setInterval(() => this.draw(), millisecondsPerFrame);
        this.draw();
    }

    public stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    private draw() {
        let elapsedTime: Duration;
        if (!this.lastDrawTimeInMs) {
            elapsedTime = Duration.zero;
        } else {
            const now = Date.now();
            elapsedTime = new Duration({milliseconds: now - this.lastDrawTimeInMs});
            this.lastDrawTimeInMs = now;
        }

        this.drawBackground();

        for (const item of this.items) {
            item.update(elapsedTime);
            item.draw(this.canvas);
        }
    }

    private onMouseMove(event: MouseEvent) {
        const canvasRect = this.canvas.getBoundingClientRect();

        const x = event.clientX - canvasRect.left;
        const y = event.clientY - canvasRect.top;

        this.mouseCoordinateDiv.innerText = `(${x.toFixed(1)}, ${y.toFixed(1)})`;


        this.emit('mouseMove', {x, y});
    }

    private drawBackground() {
        const context = this.canvas.getContext('2d');

        if (!context) {
            throw new Error('Could not get context');
        }

        context.fillStyle = 'white';
        context.fillRect(0, 0, Simulation.canvasSize.x, Simulation.canvasSize.y);
    }

    private setupCanvasEvents() {
        this.canvas.addEventListener('mousemove', e => this.onMouseMove(e));
    }
}