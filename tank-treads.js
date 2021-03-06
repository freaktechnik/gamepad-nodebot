/**
 * @author Martin Giger
 * @module tank-treads
 * @license MIT
 */

var HALF_PI = Math.PI / 2;
var THREE_HALF_PI = Math.PI + HALF_PI;

/**
 * Calculates the speed of the left and right treads for a tank-like vehicle,
 * based on an angle to go to relative to where the vehicle's currently headed.
 * @class
 */
function TankTreads() {
}
/**
 * Speed of the left tread, given by a number between 1 and -1. Negative numbers
 * mean turning backward.
 * @type {number}
 * @default 0
 */
TankTreads.prototype.leftSpeed = 0;
/**
 * Speed of the right tread, given by a number between 1 and -1. Negative numbers
 * mean turning backward.
 * @type {number}
 * @default 0
 */
TankTreads.prototype.rightSpeed = 0;

/**
 * Updates the leftSpeed and rightSpeed attributes.
 * @argument {number} angle - The angle to head into relative to the current
 *                            direction. Should be between 0 and 2 * PI.
 */
TankTreads.prototype.setInput = function(angle) {
    var shp = angle <= HALF_PI;
    var sp = angle <= Math.PI;
    if(shp || (!sp && angle < THREE_HALF_PI)) {
        this.leftSpeed = shp ? 1 : -1;
        this.rightSpeed = -this.leftSpeed * Math.cos(angle * 2);
    }
    else {
        this.rightSpeed = sp ? 1 : -1;
        this.leftSpeed = this.rightSpeed * Math.cos(angle * 2 + Math.PI);
    }
}

module.exports = TankTreads;
