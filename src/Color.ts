export default class Color {
    constructor(public r: number, public g: number, public b: number, public a: number = 1) {
    }

    get cssString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}