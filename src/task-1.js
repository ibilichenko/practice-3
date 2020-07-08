
const NORTH = 'north';
const EAST = 'east';
const SOUTH = 'south';
const WEST = 'west';

class Rover {
  constructor(x = 0, y = 0, direction = NORTH) {
    if ((Number.isInteger(x) && Number.isInteger(y)) && (direction === NORTH || direction === EAST || direction === SOUTH || direction === WEST)) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.directions = [NORTH, EAST, SOUTH, WEST];
    } else {
      throw new TypeError('Incorrect input data');
    }
  }

  left() {
    let currentDirectionIndex = this.directions.indexOf(this.direction);
    currentDirectionIndex = currentDirectionIndex !== 0 ? --currentDirectionIndex : 3;
    this.direction = this.directions[currentDirectionIndex];

    return this;
  }

  right() {
    let currentDirectionIndex = this.directions.indexOf(this.direction);
    currentDirectionIndex = currentDirectionIndex !== 3 ? ++currentDirectionIndex : 0;
    this.direction = this.directions[currentDirectionIndex];
    
    return this;
  }
  
  move(steps) {
    if (!Number.isInteger(steps)) {
      throw new TypeError('Incorrect input data');
    }
    switch (this.direction) {
      case NORTH : this.y += steps;
        break;
      case WEST : this.x -= steps;
        break;
      case SOUTH : this.y -= steps;
        break;
      case EAST : this.x += steps;
        break;
      default: break;
    }

    return this;
  }

  getPosition() {
    return {
      x: this.x,
      y: this.y
    }
  }
  
  getDirection() {
    return this.direction;
  }
}

export { NORTH, EAST, SOUTH, WEST, Rover };
