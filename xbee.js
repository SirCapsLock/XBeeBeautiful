var XBeeBeautiful = require('./XBeeBeautiful')
var xbee = new XBeeBeautiful("COM4", false)

var monitor = xbee.startMonitoring()
                .subscribe(function (transmission) {
                    console.log("remote xbee: " + transmission.remote64);
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