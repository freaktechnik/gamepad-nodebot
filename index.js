var five = require("johnny-five");
var gamepad = require("gamepad");
var Robot = require("./robot");
var TankTreads = require("./tank-treads");

var MAX_SPEED = 255;

var board = new five.Board({ repl: false });
var robot;
var treads = new TankTreads();
gamepad.init();

setInterval(gamepad.detectDevices, 500);

board.on("ready", function() {
    robot = new Robot({
        left: new five.Motor({
            pins: {
                pwm: 5,
                dir: 4
            },
            invertPWM: true
        }),
        right: new five.Motor({
            pins: {
                pwm: 3,
                dir: 2
            },
            invertPWM: true
        }),
        fullSpeed: MAX_SPEED
    });

    // Start fireing the events from the gamepad.
    setInterval(gamepad.processEvents, 18);

    var axi = { x:0 , y:0 };
    gamepad.on("move", function (id, axis, value) {
        // Only continue if we've got a changed value at one of the axis.
        // If you want to use a different axis, for example for the acceleration,
        // just change the axis ID. If you're using a different controller, you
        // might have to adjust the IDs too.
        if(axis === 2 && Math.abs(axi.x - value) > 0.1)
            axi.x = value.toFixed(2);
        else if(axis === 3 && Math.abs(axi.x -value) > 0.1)
            axi.y = -value.toFixed(2);
        else
            return;

        // Cap strength at 1
        var strength = Math.min(Math.sqrt(axi.x * axi.x + axi.y * axi.y), 1);
        var angle = Math.atan2(axi.y, axi.x);
        // Make the angle be between 0 and 2 PI instead of PI and -PI.
        if(angle < 0)
            angle = Math.PI * 2 + angle;

        robot.setSpeed(strength * MAX_SPEED, true);
        treads.setInput(angle);
        robot.setModifiers({
            left: treads.leftSpeed,
            right: treads.rightSpeed
        });
    });

    gamepad.on("down", function (id, num) {
        // The circle button (where the B is on other controllers). 
        if(num === 13)
            process.exit();
    });
});
