
const NORTH = "north",
    EAST = "east",
    SOUTH = "south",
    WEST = "west";

const directions = [NORTH, EAST, SOUTH, WEST];

class Rover {
    constructor(x = 0, y = 0, direction = NORTH) {
        if (!Number.isInteger(x) || !Number.isInteger(y) || !directions.includes(direction)) {
            throw new TypeError();
        }

        this.x = x;
        this.y = y;
        this.dir = directions.indexOf(direction);
    }

    left() {
        this.dir = (this.dir + 3) % 4;
        return this;
    }

    right() {
        this.dir = (this.dir + 1) % 4;
        return this;
    }

    move(n) {
        if (!Number.isInteger(n)) {
            throw new TypeError();
        }

        switch (directions[this.dir]) {
            case NORTH:
                this.y += n;
                break;
            case EAST:
                this.x += n;
                break;
            case SOUTH:
                this.y -= n;
                break;
            case WEST:
                this.x -= n;
                break;
            default:
        }

        return this;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    getDirection() {
        return directions[this.dir];
    }
}

export { NORTH, EAST, SOUTH, WEST, Rover };
