# XBeeBeautiful

Wrapper for xbee-rx that makes it easy to monitor and send messages to XBees

Start monitoring for incoming transmissions:

```javascript
xbee.startMonitoring().subscribe(onReceiveTransmission, onError, onExit)
```



```javascript
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

