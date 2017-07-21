#include <XBee.h>

XBee xbee = XBee();

uint8_t payload[] = "This is your message to the coordinator. It can be anything. Not sure if there's a true limit on it. Perhaps a string with parameters delimited by a stop character such as touch-12-23-64-96-62";

//address of the coordinator xbee (it's usually only the low portion of the serial number that changes between xbees, the 0013a200 remains the same)
XBeeAddress64 addr64 = XBeeAddress64(0x0013a200, 0x41671FD6);
ZBTxRequest zbTx = ZBTxRequest(addr64, payload, sizeof(payload));
ZBTxStatusResponse txStatus = ZBTxStatusResponse();

void setup() {
  Serial.begin(57600);
  xbee.setSerial(Serial);
}

void loop() {
  xbee.send(zbTx);
  delay(1000);
}
