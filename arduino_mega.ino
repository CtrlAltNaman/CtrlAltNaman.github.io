void setup() {
    Serial.begin(9600); // Initialize Serial Communication at 9600 bps
}

void loop() {
    int frequencyValue = analogRead(A0); // Read analog input (0-1023)
    Serial.println(frequencyValue);     // Send frequency value to ESP32 via Serial
    delay(100); // Send data every 100 ms
}
