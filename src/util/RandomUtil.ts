export default abstract class RandomUtil {
    static getCenteredRandom(center: number): number {
        return (Math.random() * center) - (center / 2);
    }
}