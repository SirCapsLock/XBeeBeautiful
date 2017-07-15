var rx = require("rx");
var xbeeRx = require('xbee-rx');

var xbee = xbeeRx({
    serialport: "COM4",
    serialportOptions: {
        baudrate: 57600
    },
    module: "ZigBee",
    api_mode: 2,
    // turn on debugging to see what the library is doing
    debug: true
});

console.log("Monitoring incoming packets (press CTRL-C to stop)");

// monitor CTRL-C to close serial connection
var stdin = process.stdin;
stdin.setRawMode(true);
var ctrlCStream = rx.Observable.fromEvent(stdin, "data")
    .where(function monitorCtrlCOnData(data) {
        return data.length === 1 && data[0] === 0x03; // Ctrl+C
    })
    .take(1);

var transmissionsStream = xbee
    .monitorTransmissions()
    .pluck("data")
    .map(function (buffer) {
        var s = buffer.toString();
        return s === "\r" ? "\n" : s;
    });

transmissionsStream
    .takeUntil(ctrlCStream)
    .subscribe(function (s) {
        process.stdout.write(s);
    }, function (error) {
        console.log("Error during monitoring:\n", error);
        xbee.close();
        process.exit();
    }, function () {
        console.log("\nGot CTRL-C; exiting.");
        xbee.close();
        process.exit();
    });