/**
 * @author Martin Giger
 * @module tank-treads
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
 * @type {number}
 * @default
 */
TankTreads.prototype.leftSpeed = 0;
/**
 * @type {number}
 * @default
 */
TankTreads.prototype.rightSpeed = 0;

/**
 * Updates the leftSpeed and rightSpeed attributes.
 * @argument {number} angle - The angle to head into relative to the current
 *                            direction.
 */
TankTreads.prototype.setInput = function(angle) {
    var shp = angle <= HALF_PI;
    var sp = angle <= Math.PI;
    if(shp || (!sp && angle < THREE_HALF_PI)) {
        if(shp)
            this.rightSpeed = -Math.cos(angle * 2);
        else
            this.rightSpeed = Math.cos(angle * 2);
        this.leftSpeed = shp ? 1 : -1;
    }
    else {
        this.rightSpeed = sp ? 1 : -1;
        if(sp)
            this.leftSpeed = Math.cos(angle * 2 + Math.PI);
        else
            this.leftSpeed = -Math.cos(angle * 2 + Math.PI);
    }
}

module.exports = TankTreads;
