var rx = require('rx')
var xBeeRx = require('xbee-rx')
let XBeeBeautiful = class XBeeBeautiful {
    constructor(serialPort, debug) {
        this.xbee = xBeeRx({
            serialport: serialPort,
            serialportOptions: {
                baudrate: 57600
            },
            module: "ZigBee",
            api_mode: 2,
            debug: debug
        })

        // monitor CTRL-C to close serial connection
        var stdin = process.stdin;
        stdin.setRawMode(true);
        this.ctrlCStream = rx.Observable.fromEvent(stdin, "data")
            .where(function monitorCtrlCOnData(data) {
                return data.length === 1 && data[0] === 0x03; // Ctrl+C
            })
            .take(1);
        

    }

    startMonitoring() {
        this.monitor = this.xbee
            .monitorTransmissions()
            .takeUntil(this.ctrlCStream)
        return this.monitor
    }

    stopMonitoring() {
        this.xbee.close();
    }
}
module.exports = XBeeBeautiful