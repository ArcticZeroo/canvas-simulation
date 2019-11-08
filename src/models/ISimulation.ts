import {EventEmitter2 as EventEmitter} from 'eventemitter2';

export default interface ISimulation extends EventEmitter {
    start(): void;
    stop(): void;
}