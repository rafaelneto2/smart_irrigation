#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <NTPClient.h>
#include <WiFiUDP.h>
#include "FirebaseESP8266.h"

// Set these to run example.
#define FIREBASE_HOST "https://irrigacao-inteligente.firebaseio.com/"
#define FIREBASE_AUTH "kY3my9Ao3irBgmkLGbIRY3NZJMLeqnDmoLUALtn5"
#define WIFI_SSID "Rafael"
#define WIFI_PASSWORD "nicoboco"
FirebaseData firebaseData; //Define FirebaseESP8266 data object
WiFiUDP udp;//Cria um objeto "UDP".
NTPClient ntp(udp, "a.st1.ntp.br", -3 * 3600, 60000);//Cria um objeto "NTP" com as configurações.

#define led D4//Define o LED ao pino D4.

String hora;//Váriavel que armazenara o horario do NTP.
int day;

// Publique a cada x min
#define PUBLISH_INTERVAL 1000*60*2
Ticker ticker;
bool publishNewState = true;

void publish() {
    publishNewState = true;
}

void setup() {
  Serial.begin(9600);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("conectando");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Conectado na rede: ");
  Serial.println(WIFI_SSID);
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  // Registra o ticker para publicar de tempos em tempos
  ticker.attach_ms(PUBLISH_INTERVAL, publish);

  pinMode(led, OUTPUT);//Define o pino como saida.
  digitalWrite(led, 1);//Apaga o LED.

  ntp.begin();//Inicia o NTP.
  ntp.forceUpdate();//Força o Update.
}
void loop() {
  
  if (WiFi.status() != WL_CONNECTED) {
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH); //Configura o firebase
  };

  hora = (String)ntp.getHours() +":"+ (String)ntp.getMinutes();//Armazena na váriavel HORA, o horario atual.
  day = ntp.getDay();
 
  irrigaSetor1();
  irrigaSetor2();
    
  if (publishNewState) {
    //Serial.println("Publicou");   // Mostrar valor da voltagem no monitor serial
    publishNewState = false;
  }

  ntp.update();
  
  delay(200);
  
}

bool verificaDia(String dia, String setor){
  String setorAtual = (setor + "/dia/" + dia);
  if (Firebase.getBool(firebaseData, setorAtual)){
    if (firebaseData.dataType() == "boolean"){
      return firebaseData.boolData();
    }
  }
}

int verificaDuracao(String setor){
  String setorAtual = (setor + "/duracao");
  if (Firebase.getInt(firebaseData, setorAtual)){
    if (firebaseData.dataType() == "int"){
      return (firebaseData.intData() * 1000 * 60);
    }
  }
}

void verificaHoraIrrigacao(String setor){
  String setorAtual = (setor + "/horario");
  Serial.println(setorAtual);
  if (Firebase.get(firebaseData, setorAtual)){
    if (firebaseData.dataType() == "json"){
      FirebaseJson &json = firebaseData.jsonObject();
      size_t len = json.iteratorBegin();
      String key, value = "";
      int type = 0;
      Serial.print("Hora Atual: ");
      Serial.println(hora);
      for (size_t i = 0; i < len; i++)
      {
          json.iteratorGet(i, type, key, value);
          if (value == hora) {
            digitalWrite(led, 0);//Acende
            int duracao = verificaDuracao(setor);
            Serial.print("Duração: ");
            Serial.println(duracao);
            delay(duracao);
            digitalWrite(led, 1);//Apaga
          }
      }
      json.iteratorEnd();
    }
  }
}
