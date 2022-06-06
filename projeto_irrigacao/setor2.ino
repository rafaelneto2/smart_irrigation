void irrigaSetor2(){

  Serial.println("Entrou...");
  
  bool dom = verificaDia("domingo", "setor2");
  bool seg = verificaDia("segunda", "setor2");
  bool ter = verificaDia("terca", "setor2");
  bool qua = verificaDia("quarta", "setor2");
  bool qui = verificaDia("quinta", "setor2");
  bool sex = verificaDia("sexta", "setor2");
  bool sab = verificaDia("sabado", "setor2");

  if ((dom == true) && (ntp.getDay() == 0)){
    Serial.println("Domingo");
    verificaHoraIrrigacao("setor2");
  } else if ((seg == true) && (ntp.getDay() == 1)){
    Serial.println("Segunda");
    verificaHoraIrrigacao("setor2");
  } else if ((ter == true) && (ntp.getDay() == 2)){
    Serial.println("Terça");
    verificaHoraIrrigacao("setor2");
  } else if ((qua == true) && (ntp.getDay() == 3)){
    Serial.println("Quarta");
    verificaHoraIrrigacao("setor2");
  } else if ((qui == true) && (ntp.getDay() == 4)){
    Serial.println("Quinta");
    verificaHoraIrrigacao("setor2");
  } else if ((sex == true) && (ntp.getDay() == 5)){
    Serial.println("Sexta");
    verificaHoraIrrigacao("setor2");
  } else if ((sab == true) && (ntp.getDay() == 6)){
    Serial.println("Sabado");
    verificaHoraIrrigacao("setor2");
  }
}
