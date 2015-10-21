function Robot(options) {
    this.sides = [];
    for(var side in options) {
        if(side !== "fullSpeed") {
            this.sides.push(side);
            this[side] = {
                motor: options[side],
                modifier: 0
            };
        }
        else {
            this.fullSpeed = options.fullSpeed;
        }
    }
    this.stop();
}

Robot.prototype = {
    fullSpeed: 255,
    speed: 255,
    sides: [],
    get isStopped() {
        return this.sides.every(function(side) {
            return !this[side].motor.isOn;
        }, this);
    },
    setModifier: function(side, modifier) {
        var absolute = Math.abs(modifier);

        this[side].modifier = absolute;
        var motorSpeed = Math.round(this.speed * absolute);

        if(this[side].modifier < 0.1)
            this[side].motor.stop();
        else if(modifier > 0)
            this[side].motor.forward(motorSpeed);
        else
            this[side].motor.reverse(motorSpeed);
    },
    setModifiers: function(modifiers) {
        for(var side in modifiers) {
            this.setModifier(side, modifiers[side]);
        }
    },
    setAllModifiers: function(value) {
        this.sides.forEach(function(side) {
            this.setModifier(side, value);
        }, this);
    },
    setSpeed: function(speed, dontApply) {
        if(speed === this.speed)
            return;

        if(speed > this.fullSpeed)
            this.speed = this.fullSpeed;
        else if(speed < 0)
            this.speed = 0;
        else
            this.speed = speed;

        if(!dontApply) {
            this.sides.forEach(function(side) {
                if(this[side].motor.isOn)
                    this[side].motor.start(Math.round(this.speed * this[side].modifier));
            }, this);
        }
    },
    stop: function() {
        if(!this.isStopped) {
            this.setAllModifiers(0);
        }
    },
    forward: function(speed) {
        if(speed)
            this.setSpeed(speed, true);
        this.setAllModifiers(1);
    },
    reverse: function(speed) {
        if(speed)
            this.setSpeed(speed, true);
        this.setAllModifiers(-1);
    },
    left: function() {
        this.setModifiers({
            left: -1,
            right: 1
        });
    },
    right: function() {
        this.setModifiers({
            left: 1,
            right: -1
        });
    }
};

module.exports = Robot;
