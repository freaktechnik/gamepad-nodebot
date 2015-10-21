# gamepad-nodebot
A simple nodebot controlled by a gamepad.

## Controls
The movement of the bot is mapped to the right stick of a Sony DualShock 3
controller. To quit, press the circle button.

## Usage
### Arduino pins
The script assumes that your pins are used in the following manner:
 - Left Motor
   - pwm: pin 5
   - direction: pin 4
 - Right Motor
   - pwm: pin 3
   - direction: pin 2

By default the PWM is inverted.

### Before running the script
Make sure to plug in your controller and arduino to your computer. It's possible
that you'll have to adjust the controller bindings, since the used ones are for
a Sony DualShock 3.

### Running the script
```bash
node index.js
```

If you get an access denied error, you might have to run it with `sudo`.
