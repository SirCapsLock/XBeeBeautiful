# XBeeBeautiful

Wrapper for xbee-rx that makes it easy to monitor and send messages to XBees




Start monitoring for incoming transmissions:

```javascript
xbee.startMonitoring().subscribe(onReceiveTransmission, onError, onExit)
```



```javascript
var XBeeBeautiful = require('./XBeeBeautiful');

/* 
	port - string representing the physical port on which the XBee is connected. On the pi this will be something like "dev/tty/usb??" On Windows it's "COM#"
	debug - whether to show debug information on each frame
*/
var xbee = new XBeeBeautiful("COM4", debug); 

var monitor = xbee.startMonitoring()
                .subscribe(function (transmission) {
                    console.log("remote xbee full serial: " + transmission.remote64);
                    console.log("data: " + transmission.data)
                }, function (error) {
                    console.log("Error during monitoring:\n", error);
                    xbee.stopMonitoring();
                    process.exit();
                }, function () {
                    console.log("\nGot CTRL-C; exiting.");
                    xbee.stopMonitoring();
                    process.exit();
                });
```

Stop monitoring:

```javascript
monitor.stopMonitoring();
```

