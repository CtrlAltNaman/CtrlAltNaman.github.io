#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_SSID"; // Replace with your WiFi SSID
const char* password = "YOUR_PASSWORD"; // Replace with your WiFi Password
const char* serverUrl = "http://your-webserver-url.com/data"; // Replace with your webserver endpoint

void setup() {
    Serial.begin(9600);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
}

void loop() {
    if (Serial.available()) {
        String frequencyValue = Serial.readStringUntil('\n');
        sendDataToServer(frequencyValue);
    }
}

void sendDataToServer(String value) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");

        String payload = "{\"frequency\": " + value + "}";
        int httpResponseCode = http.POST(payload);

        if (httpResponseCode > 0) {
            Serial.println("Data sent successfully");
        } else {
            Serial.println("Failed to send data");
        }

        http.end();
    }
}
