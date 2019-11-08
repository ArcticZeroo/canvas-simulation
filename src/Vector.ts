export default class Vector {
    constructor(readonly x: number = 0, readonly y: number = 0) {}

    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    multiplyScalar(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    normalize(): Vector {
        const magnitude = this.magnitude();
        return new Vector(this.x / magnitude, this.y / magnitude);
    }

    copy(): Vector {
        return new Vector(this.x, this.y);
    }
}