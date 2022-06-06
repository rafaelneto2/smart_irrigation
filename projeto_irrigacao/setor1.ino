void irrigaSetor1(){

  Serial.println("Entrou...");
  
  bool dom = verificaDia("domingo", "setor1");
  bool seg = verificaDia("segunda", "setor1");
  bool ter = verificaDia("terca", "setor1");
  bool qua = verificaDia("quarta", "setor1");
  bool qui = verificaDia("quinta", "setor1");
  bool sex = verificaDia("sexta", "setor1");
  bool sab = verificaDia("sabado", "setor1");

  if ((dom == true) && (ntp.getDay() == 0)){
    Serial.println("Domingo");
    verificaHoraIrrigacao("setor1");
  } else if ((seg == true) && (ntp.getDay() == 1)){
    Serial.println("Segunda");
    verificaHoraIrrigacao("setor1");
  } else if ((ter == true) && (ntp.getDay() == 2)){
    Serial.println("Terça");
    verificaHoraIrrigacao("setor1");
  } else if ((qua == true) && (ntp.getDay() == 3)){
    Serial.println("Quarta");
    verificaHoraIrrigacao("setor1");
  } else if ((qui == true) && (ntp.getDay() == 4)){
    Serial.println("Quinta");
    verificaHoraIrrigacao("setor1");
  } else if ((sex == true) && (ntp.getDay() == 5)){
    Serial.println("Sexta");
    verificaHoraIrrigacao("setor1");
  } else if ((sab == true) && (ntp.getDay() == 6)){
    Serial.println("Sabado");
    verificaHoraIrrigacao("setor1");
  }
}
