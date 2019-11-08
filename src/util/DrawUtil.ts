import Vector from '../Vector';
import RandomUtil from './RandomUtil';

export default abstract class DrawUtil {
    static createShapePath(context: CanvasRenderingContext2D, points: Vector[]): void {
        if (!points || !points.length) {
            return;
        }

        console.log(points);

        const [startingPoint] = points;

        context.beginPath();
        context.moveTo(startingPoint.x, startingPoint.y);

        for (let i = 1; i < points.length; ++i) {
            const point = points[i];
            context.lineTo(point.x, point.y);
        }

        context.closePath();
    }

    static wobbleLine(context: CanvasRenderingContext2D, currentPosition: Vector, destination: Vector, wobbleDeltaLength: number, wobbleMagnitude: number = 0.05) {
        console.log('Wobbling line from', currentPosition, 'to', destination);

        if (wobbleDeltaLength <= 0 || wobbleDeltaLength >= 1) {
            console.log('Wobble is not between 0 and 1 exclusive.');
            context.lineTo(destination.x, destination.y);
        }

        console.log(destination.subtract(currentPosition));

        const deltaPerWobble = destination.subtract(currentPosition).multiplyScalar(wobbleDeltaLength);
        const deltaNormalized = deltaPerWobble.normalize();
        // Intentionally reversed
        const deltaWeights = new Vector(deltaNormalized.y, deltaNormalized.x);

        const wobbleCount = Math.floor(1 / wobbleDeltaLength);

        console.log(wobbleCount, 'wobbles will occur with a delta of', deltaPerWobble, 'each');

        for (let i = 0; i < wobbleCount; ++i) {
            const nextEndPoint = currentPosition.add(deltaPerWobble);
            console.log(i, 'wobble beginning from', currentPosition, 'to', nextEndPoint);

            const wobbleX = RandomUtil.getCenteredRandom(wobbleMagnitude) * deltaPerWobble.x * deltaWeights.x;
            const wobbleY = RandomUtil.getCenteredRandom(wobbleMagnitude) * deltaPerWobble.y * deltaWeights.y;

            console.log('wobble amount (x, y):', wobbleX, wobbleY);

            context.lineTo(nextEndPoint.x + wobbleX, nextEndPoint.y + wobbleY);

            currentPosition = nextEndPoint;
        }
    }
}